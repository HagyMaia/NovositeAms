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

  // 1. Verifica sessão do usuário e busca produtos do banco
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProducts()
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProducts()
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

    const { data, error } = await supabase
      .from("products")
      .insert([{ name: newName, price: parseFloat(newPrice), category: newCategory }])
      .select()

    if (!error && data) {
      setProducts([data[0], ...products])
      setNewName("")
      setNewPrice("")
    }
  }

  // 7. Deletar Produto Real do Banco de Dados
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (!error) {
      setProducts(products.filter((p) => p.id !== id))
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
            <button type="submit" className="w-full flex items-center justify-center gap-2 mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
              <Plus className="size-4" strokeWidth={2.5} /> Adicionar Produto
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Produtos no Catálogo ({products.length})</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card group">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-muted flex items-center justify-center border border-border"><Tag className="size-5 text-muted-foreground" /></div>
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
        </div>
      </main>
    </div>
  )
}