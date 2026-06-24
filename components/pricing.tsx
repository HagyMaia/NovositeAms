"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const WHATSAPP =
  "https://wa.me/5592999999999?text=Ol%C3%A1!%20Quero%20agendar%20uma%20coleta%20Amazon%20Shoes"

const plans = [
  {
    name: "Lavagem Básica",
    price: "59,90",
    desc: "O essencial para tirar a sujeira do dia a dia.",
    features: [
      "Limpeza externa completa",
      "Higienização do solado",
      "Secagem controlada",
      "Cadarços lavados",
    ],
    featured: false,
  },
  {
    name: "Completa",
    price: "69,90",
    desc: "Limpeza profunda dentro e fora, do jeito certo.",
    features: [
      "Tudo da Lavagem Básica",
      "Limpeza interna + anti-odor",
      "Tratamento de ozônio",
      "Palmilha higienizada",
      "Escovação artesanal",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "79,90",
    desc: "O tratamento completo com proteção e acabamento.",
    features: [
      "Tudo da Completa",
      "Hidroblindagem protetora",
      "Restauração de cor",
      "Acabamento e perfume",
      "Prioridade na entrega",
    ],
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="planos" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Nossos serviços
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Escolha o tratamento ideal
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Preços por par. Coleta e entrega delivery inclusas em toda Manaus.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 ${
                plan.featured
                  ? "border-primary bg-card lg:-mt-4 lg:mb-4 lg:shadow-[0_0_60px_-15px_oklch(0.88_0.24_130_/_0.4)]"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Mais pedido
                </span>
              )}

              <h3 className="text-lg font-semibold tracking-tight">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="text-5xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span className="mb-1.5 text-sm text-muted-foreground">
                  /par
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                  plan.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                Agendar coleta
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
