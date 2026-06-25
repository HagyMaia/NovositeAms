"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MessageCircle, Truck, Clock, MapPin } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/5592993514747?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20delivery.";

const perks = [
  { icon: Truck, label: "Coleta grátis", sub: "Buscamos na sua porta" },
  { icon: Clock, label: "Pronto em 48h", sub: "Entrega rápida" },
  { icon: MapPin, label: "Toda Manaus", sub: "Atendemos a cidade inteira" },
]

export function CtaDelivery() {
  return (
    <section id="delivery" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-card"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/20 blur-[120px]"
          />

          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Coleta delivery
              </span>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Agende sua coleta pelo WhatsApp
              </h2>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
                É só mandar uma mensagem. A gente busca seus tênis, cuida de
                cada detalhe e devolve novinhos na sua porta. Sem complicação.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <MessageCircle className="size-5" strokeWidth={2} />
                Agendar coleta no WhatsApp
              </a>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {perks.map((p) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <p.icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/sneaker-delivery.png"
                alt="Tênis limpos em caixa de entrega premium"
                width={700}
                height={560}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}