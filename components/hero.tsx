"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Truck, Zap, ArrowRight, ShieldCheck } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Glow Accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.88_0.24_130_/_0.15),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 px-4 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-md shadow-sm"
        >
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>Lavagem & Restauração Premium de Tênis · Manaus - AM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Seus tênis{" "}
          <span className="text-primary">novos de novo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Cuidado artesanal especializado, sanitização por ozônio e hidroblindagem para
          devolver a vida e o brilho dos seus pares favoritos. Buscamos e entregamos na
          sua porta em toda a cidade.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105"
          >
            <span>Agendar Coleta no WhatsApp</span>
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#planos"
            className="w-full sm:w-auto rounded-full border border-border bg-card/80 px-8 py-4 text-center text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-card hover:border-primary/40"
          >
            Conhecer os Planos
          </a>
        </motion.div>

        {/* Quick Highlights / Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-foreground font-semibold">5.0</span>
            <span>Avaliações em Manaus</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Truck className="size-3.5 text-primary" />
            <span>Delivery em Toda Manaus</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            <span>Garantia de Qualidade</span>
          </div>
        </motion.div>

        {/* Hero Sneaker Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/sneaker-hero.png"
              alt="Tênis restaurado e higienizado pela Amazon Shoes Lavanderia Manaus"
              width={900}
              height={620}
              priority
              className="mx-auto h-auto w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
