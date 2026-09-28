"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Shield, Clock, CheckCircle2 } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

const cases = [
  {
    id: "couro",
    title: "Nike Air Force 1 — Couro Branco",
    category: "Restauração Completa",
    problem: "Encardido severo, marcas no solado e amarelamento",
    solution: "Higienização profunda, clareamento da entressola e hidratação do couro",
    beforeText: "Manchas profundas e solado amarelado",
    afterText: "Brilho original resgatado e couro hidratado",
    badge: "100% Restaurado",
    beforeColor: "from-amber-950/40 to-stone-900/80",
    afterColor: "from-primary/20 to-emerald-950/30",
  },
  {
    id: "camurca",
    title: "Adidas Samba — Suede / Camurça",
    category: "Tratamento Delicado",
    problem: "Acúmulo de poeira fina, rigidez do tecido e manchas líquidas",
    solution: "Escovação a seco ultra-macia, revitalizador de toque e hidroblindagem",
    beforeText: "Toque áspero e manchas d'água",
    afterText: "Textura aveludada revivida + repelência à água",
    badge: "Hidroblindado",
    beforeColor: "from-orange-950/40 to-stone-900/80",
    afterColor: "from-primary/20 to-emerald-950/30",
  },
  {
    id: "corrida",
    title: "On Running Cloudmonster — Mesh & Espuma",
    category: "Higienização + Ozônio",
    problem: "Lama de treino externo, odores de transpiração e manchas na malha",
    solution: "Lavagem por sucção, câmara de ozônio anti-bacteriana e secagem 100% controlada",
    beforeText: "Barro entranhado e odor residual",
    afterText: "Higienização estéril e perfume exclusivo",
    badge: "Ozônio Ativo",
    beforeColor: "from-stone-950/60 to-zinc-900/80",
    afterColor: "from-primary/20 to-emerald-950/30",
  },
]

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState(0)
  const currentCase = cases[activeTab]

  return (
    <section id="resultados" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 h-80 w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Resultados Comprovados
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            A transformação que seus pares merecem
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground text-sm sm:text-base">
            Veja como recuperamos pares considerados &quot;perdidos&quot; através do nosso método artesanal com tecnologia de ozônio.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {cases.map((c, index) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(index)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === index
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "border border-border bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>

        {/* Interactive Case Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 rounded-3xl border border-border bg-card/80 p-6 sm:p-10 backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              
              {/* Visual Before & After Comparison Cards */}
              <div className="w-full lg:w-3/5 grid sm:grid-cols-2 gap-4">
                {/* Before Box */}
                <div className={`relative flex flex-col justify-between rounded-2xl border border-red-500/20 bg-gradient-to-b ${currentCase.beforeColor} p-6 min-h-[220px]`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                      Antes da Lavagem
                    </span>
                    <Clock className="size-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-200/90 leading-relaxed">
                      &quot;{currentCase.beforeText}&quot;
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Diagnóstico: {currentCase.problem}
                    </p>
                  </div>
                </div>

                {/* After Box */}
                <div className={`relative flex flex-col justify-between rounded-2xl border border-primary/40 bg-gradient-to-b ${currentCase.afterColor} p-6 min-h-[220px] shadow-lg shadow-primary/10`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground uppercase tracking-wider">
                      {currentCase.badge}
                    </span>
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-relaxed">
                      &quot;{currentCase.afterText}&quot;
                    </p>
                    <p className="mt-3 text-xs text-primary font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" /> Tratamento com garantia Amazon Shoes
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Details */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {currentCase.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {currentCase.title}
                </h3>
                
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-border bg-background/50 p-3.5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Processo Aplicado</p>
                    <p className="text-sm text-foreground mt-1">{currentCase.solution}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="size-4 text-primary" />
                    <span>Higienização com produtos biodegradáveis e ozônio</span>
                  </div>
                </div>

                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 shadow-md shadow-primary/20"
                >
                  Quero esse resultado no meu par
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
