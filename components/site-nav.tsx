"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const CLIENT_LOG_LINK = "https://site.nuvemgestor.com.br/CV1AT7S9LTLKGSQ6U264CNO34BQEX9V0DJCXU/login.asp";

const links = [
  { label: "Como funciona", href: "#formula" },
  { label: "Planos", href: "#planos" },
  { label: "Delivery", href: "#delivery" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          {/* Logo Oficial Atualizada */}
          <Image 
            src="/logo.png" 
            alt="Amazon Shoes Lavanderia de Tênis" 
            width={38} 
            height={38} 
            className="object-contain"
          />
          <span className="text-sm font-semibold tracking-tight">
            Amazon<span className="text-primary">Shoes</span>
          </span>
        </a>

        {/* Links Centrais (Desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Lado Direito: Gestor + Área do Cliente + CTA */}
        <div className="flex items-center gap-5">
          {/* NOVO BOTÃO: GESTOR (Redireciona para /admin) */}
          <a 
            href="/admin"
            className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary sm:inline-block border border-border bg-card/40 px-3.5 py-1.5 rounded-xl hover:bg-card"
          >
            Gestor
          </a>

          <a 
            href={CLIENT_LOG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            Área do Cliente
          </a>
          
          <a
            href="#delivery"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Agendar coleta
          </a>
        </div>

      </nav>
    </header>
  )
}