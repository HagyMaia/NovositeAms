"use client"

import { motion } from "framer-motion"
import { Sparkles, ShieldCheck, Cpu } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Cuidado Artesanal",
    desc: "Cada par é higienizado à mão por especialistas, com escovas e produtos específicos para cada material — couro, knit, suede ou lona.",
    tag: "01",
  },
  {
    icon: ShieldCheck,
    title: "Hidroblindagem",
    desc: "Camada protetora invisível que repele água, lama e manchas. Seus tênis ficam blindados contra o dia a dia de Manaus.",
    tag: "02",
  },
  {
    icon: Cpu,
    title: "Tecnologia Avançada",
    desc: "Equipamentos de ozônio e secagem controlada eliminam odores e bactérias sem agredir os tecidos. Limpeza profunda de verdade.",
    tag: "03",
  },
]

export function Features() {
  return (
    <section id="formula" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            A fórmula Amazon Shoes
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Três pilares para um resultado impecável
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
              />
              <span className="font-mono text-sm text-muted-foreground">
                {f.tag}
              </span>
              <div className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
                <f.icon className="size-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
