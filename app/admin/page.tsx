
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import { Plus, Package, DollarSign, LogOut, Trash2, Tag } from "lucide-react"

// Configuração segura do Supabase (Usa o .env ou os seus dados como fallback automático)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dacpznlwqexxihsjyram.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_OONbT-B_R-Ct7mSLjtsIBA_hZnUzoGc"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })

  // Estados dos produtos vindo do Banco de Dados
  const [products, setProducts] = useState<any[]>([])
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategory, setNewCategory] = useState("Cadarços")
  const [newImage, setNewImage] = useState("")
  const [newImageName, setNewImageName] = useState("")
  const [notices, setNotices] = useState<any[]>([])
  const [newNoticeTitle, setNewNoticeTitle] = useState("")
  const [newNoticeDescription, setNewNoticeDescription] = useState("")
  const [newMedia, setNewMedia] = useState("")
  const [newMediaType, setNewMediaType] = useState("")
  const [newMediaName, setNewMediaName] = useState("")
  const [newMediaFile, setNewMediaFile] = useState<File | null>(null)
  const [noticeMessage, setNoticeMessage] = useState({ type: "", text: "" })

  // 1. Verifica sessão do usuário e busca produtos do banco
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProducts()
        fetchNotices()
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProducts()
        fetchNotices()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // 2. Buscar Produtos Reais do Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (!error && data) setProducts(data)
  }

  // 2.2 Buscar Avisos Promocionais
  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) setNotices(data)
  }

  // 3. Login Real
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage({ type: "error", text: "E-mail ou senha incorretos." })
    }
  }

  // 4. Recuperação de Senha (Envia e-mail oficial se esquecer)
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Digite seu e-mail no campo antes de clicar aqui." })
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    })
    if (error) {
      setMessage({ type: "error", text: "Erro ao enviar e-mail de recuperação." })
    } else {
      setMessage({ type: "success", text: "E-mail de recuperação enviado! Verifique sua caixa de entrada." })
    }
  }

  // 5. Logout Real
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setProducts([])
  }

  // 6. Adicionar Produto Real no Banco de Dados
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newPrice) return

    const insertData: any = {
      name: newName,
      price: parseFloat(newPrice),
      category: newCategory,
    }

    if (newImage.trim()) {
      insertData.image = newImage.trim()
    }

    const { data, error } = await supabase
      .from("products")
      .insert([insertData])
      .select()

    if (!error && data) {
      setProducts([data[0], ...products])
      setNewName("")
      setNewPrice("")
      setNewCategory("Cadarços")
      setNewImage("")
      setNewImageName("")
    }
  }

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault()
    // Require a title and either a prefilled media URL or a selected file
    if (!newNoticeTitle || (!newMedia && !newMediaFile)) {
      setNoticeMessage({ type: 'error', text: 'Preencha o título e selecione uma imagem ou vídeo.' })
      return
    }
    setNoticeMessage({ type: '', text: '' })

    try {
      let mediaUrl = newMedia

      // If the user selected a File, upload to Supabase Storage and use the public URL
      if (newMediaFile) {
        // Do not prefix the file path with the bucket name — pass a path relative to the bucket.
        const filePath = `${Date.now()}_${newMediaFile.name.replace(/\s+/g, "_")}`
        const { data: uploadData, error: uploadError } = await supabase.storage.from('notices').upload(filePath, newMediaFile)

        if (uploadError) {
            console.error('Storage upload error:', uploadError)
            // Common cause: bucket doesn't exist or permission issue
            const message = uploadError?.message || JSON.stringify(uploadError)
            // If bucket not found, fallback to embedding Base64 to keep the flow working
            if (/bucket not found/i.test(message) || uploadError?.status === 404) {
              try {
                const toDataUrl = (file: File) =>
                  new Promise<string>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = () => resolve(reader.result as string)
                    reader.onerror = () => reject(new Error('Falha ao ler arquivo como Base64'))
                    reader.readAsDataURL(file)
                  })

                if (newMediaFile) {
                  const base64 = await toDataUrl(newMediaFile)
                  mediaUrl = base64
                  // continue to insert using mediaUrl
                }
              } catch (readErr) {
                console.error('Fallback base64 read error:', readErr)
                setNoticeMessage({ type: 'error', text: `Erro ao enviar arquivo para Storage: ${message}. E falha no fallback Base64.` })
                return
              }
            } else {
              setNoticeMessage({ type: 'error', text: `Erro ao enviar arquivo para Storage: ${message}. Verifique se o bucket 'notices' existe.` })
              return
            }
        }

        // getPublicUrl is synchronous — it returns { data: { publicUrl } }
        const { data: publicData } = supabase.storage.from('notices').getPublicUrl(filePath)
        mediaUrl = publicData?.publicUrl || ''
      }

      const insertData: any = {
        title: newNoticeTitle,
        description: newNoticeDescription,
        media: mediaUrl,
        media_type: newMediaType,
      }

      const { data, error } = await supabase
        .from('notices')
        .insert([insertData])
        .select()

      if (error) {
        console.error('Supabase insert error (notices):', error)
        setNoticeMessage({ type: 'error', text: `${error.message || JSON.stringify(error)}. Verifique se a tabela 'notices' existe.` })
        return
      }

      if (data) {
        setNotices([data[0], ...notices])
        setNewNoticeTitle('')
        setNewNoticeDescription('')
        setNewMedia('')
        setNewMediaFile(null)
        setNewMediaType('')
        setNewMediaName('')
        setNoticeMessage({ type: 'success', text: 'Aviso publicado com sucesso.' })
      }
    } catch (err) {
      console.error('Unexpected error adding notice:', err)
      setNoticeMessage({ type: 'error', text: String(err) })
    }
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      setNewImage("")
      setNewImageName("")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === "string") {
        setNewImage(result)
        setNewImageName(file.name)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      setNewMedia("")
      setNewMediaName("")
      setNewMediaType("")
      return
    }

    // Reject very large files early (Supabase Storage or UI performance)
    const maxBytes = 20 * 1024 * 1024 // 20MB
    if (file.size > maxBytes) {
      setNoticeMessage({ type: 'error', text: 'Arquivo muito grande. Use vídeo/imagem menor que 20MB ou crie um link via Storage.' })
      setNewMedia("")
      setNewMediaFile(null)
      setNewMediaName("")
      setNewMediaType("")
      return
    }

    // Store the raw File for upload to Storage later
    setNewMediaFile(file)
    setNewMediaName(file.name)
    setNewMediaType(file.type.startsWith('video/') ? 'video' : 'image')
  }

  // 7. Deletar Produto Real do Banco de Dados
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (!error) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  // 7.2 Deletar Aviso/Promo do Banco de Dados
  const handleDeleteNotice = async (id: number) => {
    const { error } = await supabase.from("notices").delete().eq("id", id)
    if (!error) {
      setNotices(notices.filter((n) => n.id !== id))
      setNoticeMessage({ type: "success", text: "Aviso removido." })
    } else {
      setNoticeMessage({ type: "error", text: "Erro ao remover aviso." })
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Carregando painel protegido...</div>
  }

  // TELA DE LOGIN
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <Image src="/logo.png" alt="Amazon Shoes" width={50} height={50} className="object-contain" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight">Painel do <span className="text-primary">Gestor</span></h2>
            <p className="mt-2 text-sm text-muted-foreground">Faça login com sua conta do Supabase</p>
          </div>

          {message.text && (
            <div className={`p-4 text-sm rounded-xl border ${message.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-primary/10 border-primary/20 text-primary'}`}>
              {message.text}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">E-mail do Gestor</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="seu-email@exemplo.com" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Senha</label>
                  <button type="button" onClick={handleForgotPassword} className="text-xs text-primary hover:underline">Esqueceu a senha?</button>
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="••••••••" />
                <p className="mt-2 text-xs text-muted-foreground">E-mail de recuperação: <span className="text-primary">amz.shoes@hotmail.com</span></p>
              </div>
            </div>
            <button type="submit" className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">Acessar Painel Real</button>
          </form>
        </div>
      </div>
    )
  }

  // PAINEL INTERNO
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Amazon Shoes" width={32} height={32} />
            <span className="font-semibold text-sm tracking-tight">Amazon<span className="text-primary">Gestor</span></span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="size-4" /> Sair do Painel
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 grid gap-8 md:grid-cols-3">
        {/* Formulário */}
        <div className="rounded-2xl border border-border bg-card p-6 h-fit">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Package className="size-5 text-primary" /> Cadastrar Produto</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome do Item</label>
              <input type="text" required placeholder="Ex: Cadarço de Algodão Preto" value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preço (R$)</label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <input type="number" required step="0.01" placeholder="29.90" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categoria</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none text-muted-foreground">
                <option value="Cadarços">Cadarços</option>
                <option value="Palmilhas">Palmilhas</option>
                <option value="Limpeza">Produtos de Limpeza</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Imagem do produto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground focus:border-primary focus:outline-none"
              />
              {newImageName && (
                <p className="mt-2 text-xs text-muted-foreground">Arquivo selecionado: <span className="text-primary">{newImageName}</span></p>
              )}
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
              <Plus className="size-4" strokeWidth={2.5} /> Adicionar Produto
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Package className="size-5 text-primary" /> Cadastrar Aviso</h3>
          {noticeMessage.text && (
            <div className={`p-4 text-sm rounded-xl border ${noticeMessage.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-primary/10 border-primary/20 text-primary'}`}>
              {noticeMessage.text}
            </div>
          )}
          <form onSubmit={handleAddNotice} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Título do Aviso</label>
              <input type="text" required value={newNoticeTitle} onChange={(e) => setNewNoticeTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="Ex: Promoção nova" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Descrição</label>
              <textarea value={newNoticeDescription} onChange={(e) => setNewNoticeDescription(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" rows={3} placeholder="Texto breve para o aviso (opcional)" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Imagem ou vídeo</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaFileChange}
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground focus:border-primary focus:outline-none"
              />
              {newMediaName && (
                <p className="mt-2 text-xs text-muted-foreground">Arquivo selecionado: <span className="text-primary">{newMediaName}</span></p>
              )}
            </div>
            <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">Publicar Aviso</button>
          </form>
        </div>

        {/* Lista */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Produtos no Catálogo ({products.length})</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card group">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-muted flex items-center justify-center border border-border overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <Tag className="size-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="text-sm font-bold text-primary mt-0.5">R$ {product.price.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(product.id)} className="p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold tracking-tight">Avisos publicados ({notices.length})</h3>
            </div>
            {notices.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ainda não há avisos publicados. Use o formulário à esquerda para adicionar um banner de imagem ou vídeo.</p>
            ) : (
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div key={notice.id} className="rounded-2xl border border-border bg-background p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="font-semibold">{notice.title}</h4>
                        {notice.description && <p className="text-sm text-muted-foreground mt-1">{notice.description}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{notice.media_type}</span>
                        <button onClick={() => handleDeleteNotice(notice.id)} className="p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors text-sm">Excluir</button>
                      </div>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-muted/10">
                      {notice.media_type === "video" ? (
                        <video src={notice.media} controls className="h-52 w-full object-cover" />
                      ) : (
                        <img src={notice.media} alt={notice.title} className="h-52 w-full object-cover" />
                      )}
                    </div>
                        <div className="mt-2 text-xs text-muted-foreground break-all">
                          <strong>Media:</strong> <span className="text-xxs">{notice.media}</span>
                        </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}