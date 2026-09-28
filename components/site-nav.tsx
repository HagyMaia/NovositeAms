"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ArrowRight, 
  ExternalLink, 
  MapPin, 
  Sparkles, 
  Layers, 
  Calculator, 
  HelpCircle, 
  PhoneCall, 
  ShieldCheck, 
  Lock
} from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { ThemeToggle } from "@/components/theme-toggle"
import { InstagramIcon } from "@/components/icons"

const navigationItems = [
  { 
    label: "Como Funciona", 
    href: "#formula", 
    desc: "Cuidado artesanal, ozônio e hidroblindagem",
    icon: Sparkles
  },
  { 
    label: "Antes & Depois", 
    href: "#resultados", 
    desc: "Transformações reais em couro, camurça e mesh",
    icon: Layers
  },
  { 
    label: "Planos de Lavagem", 
    href: "#planos", 
    desc: "Básica, Completa (+ Ozônio) e Premium",
    icon: ShieldCheck
  },
  { 
    label: "Simulador de Pedido", 
    href: "#calculadora", 
    desc: "Calcule seus pares e monte seu orçamento",
    icon: Calculator
  },
  { 
    label: "Perguntas Frequentes", 
    href: "#faq", 
    desc: "Prazos, entrega delivery e tipos de materiais",
    icon: HelpCircle
  },
  { 
    label: "Sede Adrianópolis & Contato", 
    href: "#contato", 
    desc: "Horários de visita e canais de atendimento",
    icon: MapPin
  },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [drawerOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl shadow-lg shadow-black/20"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          
          {/* Logo Oficial */}
          <a href="#top" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="relative size-8 sm:size-11 transition-transform group-hover:scale-105 shrink-0">
              <Image 
                src="/logo.png" 
                alt="Amazon Shoes Lavanderia de Tênis" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-foreground leading-tight">
                Amazon<span className="text-primary">Shoes</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-muted-foreground font-bold">
                Lavanderia de Tênis · Manaus
              </span>
            </div>
          </a>

          {/* Ações da Barra Superior (Responsivo e Ultra Limpo) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Alternador de Tema Claro / Escuro */}
            <ThemeToggle />

            {/* CTA Principal de Agendamento (Visível em Tablet/Desktop) */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105 whitespace-nowrap"
            >
              <span>Agendar Coleta</span>
              <ArrowRight className="size-3.5" />
            </a>

            {/* Botão do Menu Lateral (Drawer) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur transition-all hover:bg-card hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="size-4 text-primary transition-transform group-hover:scale-110" />
              <span className="text-[11px] sm:text-xs">Menu</span>
            </button>

          </div>

        </div>
      </header>

      {/* PAINEL LATERAL (OFFCANVAS SIDEBAR DRAWER) */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop com Blur e Fechamento ao Clicar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Painel Deslizante da Direita */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative z-10 flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-border bg-card/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-foreground"
            >
              
              {/* Topo do Painel Lateral */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border/80">
                  <div className="flex items-center gap-3">
                    <div className="relative size-9">
                      <Image 
                        src="/logo.png" 
                        alt="Amazon Shoes" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base tracking-tight text-foreground">
                        Amazon<span className="text-primary">Shoes</span>
                      </h3>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                        Navegação do Site
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground hover:bg-card hover:text-foreground transition-all"
                    aria-label="Fechar menu"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Lista de Navegação Principal */}
                <div className="mt-6 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 px-3">
                    Seções do Site
                  </p>

                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className="group flex items-start gap-3.5 rounded-2xl p-3 transition-all hover:bg-primary/10 hover:border-primary/20"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-0.5">
                        <item.icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Bloco de Links e Portais */}
                <div className="mt-6 pt-6 border-t border-border/80 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 px-3">
                    Acessos Diretos
                  </p>

                  {/* Google Maps Rota */}
                  <a
                    href={SITE_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-card transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="size-4 text-primary" />
                      <span>Ver Localização no Google Maps</span>
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </a>

                  {/* Área do Cliente NuvemGestor */}
                  <a
                    href={SITE_CONFIG.clientPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-card transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Lock className="size-4 text-primary" />
                      <span>Área do Cliente (NuvemGestor)</span>
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </a>

                  {/* Painel do Gestor */}
                  <a
                    href="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-card transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="size-4 text-primary" />
                      <span>Painel do Gestor Administrativo</span>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* Rodapé do Painel Lateral */}
              <div className="mt-8 pt-6 border-t border-border/80 space-y-4">
                
                {/* Botão de Agendamento WhatsApp */}
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
                >
                  <PhoneCall className="size-4" />
                  <span>Agendar Coleta no WhatsApp</span>
                </a>

                {/* Informações da Loja */}
                <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <MapPin className="size-3 text-primary" /> Adrianópolis, Manaus - AM
                  </p>
                  <p>{SITE_CONFIG.hours.weekdays}</p>
                </div>

                {/* Redes Sociais */}
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <a
                    href={SITE_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <InstagramIcon className="size-4 text-primary" />
                    <span>{SITE_CONFIG.instagramHandle}</span>
                  </a>

                  <span className="text-[10px] text-muted-foreground/60">
                    © {new Date().getFullYear()} Amazon Shoes
                  </span>
                </div>

              </div>

            </motion.aside>

          </div>
        )}
      </AnimatePresence>
    </>
  )
}