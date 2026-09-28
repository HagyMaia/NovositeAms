"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MessageCircle, Truck, Clock, MapPin, ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

const perks = [
  { icon: Truck, label: "Coleta Grátis", sub: "Buscamos na sua porta" },
  { icon: Clock, label: "Pronto em 48h", sub: "Entrega ágil e segura" },
  { icon: MapPin, label: "Toda Manaus", sub: "Rota diária por todos os bairros" },
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
          className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl"
        >
          {/* Subtle glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/20 blur-[120px]"
          />

          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="relative">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Coleta Delivery Manaus
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Agende sua coleta direto pelo WhatsApp
              </h2>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground text-sm sm:text-base">
                É só mandar uma mensagem com seu endereço. A gente retira seus tênis, realiza o tratamento artesanal completo e devolve novinhos na sua porta.
              </p>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105"
              >
                <MessageCircle className="size-5" />
                Agendar Coleta no WhatsApp
                <ArrowRight className="size-4" />
              </a>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {perks.map((p) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <p.icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-bold">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/sneaker-delivery.png"
                alt="Tênis higienizados na caixa de entrega premium Amazon Shoes"
                width={700}
                height={560}
                className="h-auto w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}