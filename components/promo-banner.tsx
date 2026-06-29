"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dacpznlwqexxihsjyram.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_OONbT-B_R-Ct7mSLjtsIBA_hZnUzoGc"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function PromoBanner() {
  const [notices, setNotices] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [mediaStatus, setMediaStatus] = useState<Record<string, { ok: boolean; err?: string }>>({})

  const attemptResolveMedia = async (mediaUrl: string) => {
    if (!mediaUrl) return mediaUrl
    // If already a full http URL, try to derive the bucket path
    const candidates: string[] = []
    try {
      const marker = '/object/public/notices/'
      if (mediaUrl.includes(marker)) {
        const rest = mediaUrl.split(marker)[1] // may be 'notices/xxx' or 'xxx'
        candidates.push(rest)
        if (rest.startsWith('notices/')) candidates.push(rest.replace(/^notices\//, ''))
        const base = rest.split('/').pop() || rest
        candidates.push(base)
      } else if (!mediaUrl.startsWith('http') && !mediaUrl.startsWith('data:')) {
        candidates.push(mediaUrl)
        if (mediaUrl.startsWith('notices/')) candidates.push(mediaUrl.replace(/^notices\//, ''))
        candidates.push(mediaUrl.split('/').pop() || mediaUrl)
      }

      for (const c of candidates) {
        if (!c) continue
        try {
          // getPublicUrl is synchronous-returning object
          const res = supabase.storage.from('notices').getPublicUrl(c)
          // @ts-ignore
          const publicUrl = res?.data?.publicUrl
          if (publicUrl) {
            // quick check: try to load image by creating Image and awaiting onload/onerror
            const ok = await new Promise<boolean>((resolve) => {
              const img = new Image()
              img.onload = () => resolve(true)
              img.onerror = () => resolve(false)
              img.src = publicUrl
            })
            if (ok) return publicUrl
          }
        } catch (e) {
          // ignore and continue
        }
      }
    } catch (e) {
      // ignore
    }
    return mediaUrl
  }

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3)

      if (!error && data?.length) {
        setNotices(data)
      }
    }

    fetchNotices()
  }, [])

  if (!notices.length) return null

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-card px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-border/80 bg-background/80 p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="sm:flex-1 max-w-2xl space-y-4">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">Avisos</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{notices[0].title}</h2>
            {notices[0].description && (
              <p className="text-base leading-8 text-muted-foreground">{notices[0].description}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:w-1/3">
            <div className="grid grid-cols-3 gap-3">
              {notices.map((n: any, i: number) => {
                const key = `${n.id}-${i}`
                const isVideo = n.media_type === 'video'
                const src = n.media
                return (
                  <button key={key} onClick={() => setSelected(n)} className="overflow-hidden rounded-xl border border-border bg-muted/5 p-1">
                    {isVideo ? (
                      <video src={src} muted playsInline className="h-24 w-full object-cover" onError={async (e) => {
                        const fixed = await attemptResolveMedia(src)
                        if (fixed && fixed !== src) {
                          // update notices array so thumbnail/modal use fixed url
                          setNotices((prev) => prev.map(x => x.id === n.id ? { ...x, media: fixed } : x))
                        } else {
                          setMediaStatus((s) => ({ ...s, [key]: { ok: false, err: 'media failed to load' } }))
                        }
                      }} />
                    ) : (
                      <img src={src} alt={n.title} className="h-24 w-full object-cover" onError={async () => {
                        const fixed = await attemptResolveMedia(src)
                        if (fixed && fixed !== src) {
                          setNotices((prev) => prev.map(x => x.id === n.id ? { ...x, media: fixed } : x))
                        } else {
                          setMediaStatus((s) => ({ ...s, [key]: { ok: false, err: 'media failed to load' } }))
                        }
                      }} />
                    )}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground">Clique na miniatura para abrir em tamanho completo</p>
          </div>
        </div>
      </section>

      {selected && <MediaModal item={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

export function MediaModal({ item, onClose }: { item: any | null; onClose: () => void }) {
  if (!item) return null
  const isVideo = item.media_type === 'video'

  // If media is a storage path (not a full URL), try to get public URL
  let src = item.media

  if (src && !src.startsWith('http') && !src.startsWith('data:')) {
    try {
      const publicUrl = supabase.storage.from('notices').getPublicUrl(src)
      // getPublicUrl returns { data: { publicUrl } }
      // In client code, this is synchronous response object
      // we only use it if publicUrl exists
      // @ts-ignore
      if (publicUrl?.data?.publicUrl) src = publicUrl.data.publicUrl
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-lg bg-background p-2">
          {isVideo ? (
            <video src={src} controls autoPlay className="max-h-[80vh] max-w-[80vw]" />
          ) : (
            <img src={src} alt={item.title} className="max-h-[80vh] max-w-[80vw] object-contain" />
          )}
        </div>
      </div>
    </div>
  )
}
