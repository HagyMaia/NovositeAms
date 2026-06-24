"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.88_0.24_130_/_0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          Lavagem premium de tênis · Manaus
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Seus tênis{" "}
          <span className="text-primary">novos de novo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Cuidado artesanal, hidroblindagem e tecnologia avançada para
          devolver o brilho dos seus pares favoritos. Buscamos e entregamos na
          sua porta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#delivery"
            className="w-full rounded-full bg-primary px-8 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:w-auto"
          >
            Agendar coleta delivery
          </a>
          <a
            href="#planos"
            className="w-full rounded-full border border-border bg-card/60 px-8 py-3.5 text-center text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-card sm:w-auto"
          >
            Ver planos
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-14 max-w-3xl"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/sneaker-hero.png"
              alt="Tênis branco limpo com iluminação verde lima"
              width={900}
              height={620}
              priority
              className="mx-auto h-auto w-full drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
