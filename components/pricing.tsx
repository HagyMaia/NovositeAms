"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

const plans = [
  {
    name: "Lavagem Básica",
    price: "59,90",
    desc: "O essencial para tirar a sujeira do dia a dia com higienização completa.",
    features: [
      "Limpeza externa completa",
      "Higienização profunda do solado",
      "Secagem com temperatura controlada",
      "Cadarços limpos e passados",
    ],
    featured: false,
    tag: "Essencial",
  },
  {
    name: "Lavagem Completa",
    price: "69,90",
    desc: "Limpeza profunda dentro e fora, com eliminação de odores e bactérias.",
    features: [
      "Tudo da Lavagem Básica",
      "Limpeza interna completa",
      "Câmara de Ozônio anti-odor e fungos",
      "Palmilha higienizada e perfumada",
      "Escovação artesanal para materiais sensíveis",
    ],
    featured: true,
    tag: "Mais Pedido",
  },
  {
    name: "Lavagem Premium",
    price: "79,90",
    desc: "O tratamento completo com proteção hidrofóbica e acabamento de alto nível.",
    features: [
      "Tudo da Lavagem Completa",
      "Hidroblindagem protetora contra líquidos",
      "Restauração e realce de cor",
      "Acabamento com fragrância exclusiva",
      "Prioridade na fila de entrega",
    ],
    featured: false,
    tag: "Blindado",
  },
]

export function Pricing() {
  return (
    <section id="planos" className="relative py-20 sm:py-28 overflow-hidden w-full">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[90vw] max-w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Planos de Lavagem
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Escolha o tratamento ideal
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground text-sm sm:text-base">
            Valores por par com garantia de satisfação. Coleta e entrega delivery inclusas em toda Manaus.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 items-stretch">
          {plans.map((plan, i) => {
            const planMsg = encodeURIComponent(
              `Olá! Gostaria de agendar uma coleta para o plano ${plan.name} (R$ ${plan.price}/par).`
            )
            const planUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${planMsg}`

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all ${
                  plan.featured
                    ? "border-primary bg-card shadow-2xl shadow-primary/10 lg:-translate-y-2 ring-1 ring-primary/40"
                    : "border-border bg-card/70 hover:border-border/80"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                    <Sparkles className="size-3" /> {plan.tag}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {plan.desc}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-muted-foreground">R$</span>
                    <span className="text-5xl font-black tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /par
                    </span>
                  </div>

                  <ul className="mt-8 flex flex-col gap-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-xs sm:text-sm">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={planUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md ${
                    plan.featured
                      ? "bg-primary text-primary-foreground shadow-primary/25"
                      : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <span>Agendar {plan.name}</span>
                  <ArrowRight className="size-4" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
