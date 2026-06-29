"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Sparkles } from "lucide-react"

export function About() {
  return (
    <section id="quem-somos" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Raízes de Manaus
            </span>
            <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl text-foreground leading-[1.1]">
              O cuidado artesanal encontra a <span className="text-primary">alta tecnologia</span>
            </h2>
            
            <div className="mt-6 border-l-2 border-primary pl-4 italic text-muted-foreground text-base sm:text-lg">
              A <strong className="text-foreground font-semibold">Amazon Shoes Lavanderia</strong> não é apenas um serviço de limpeza; é uma extensão da paixão por calçados em Manaus.
            </div>
            
            <div className="mt-6 text-pretty text-muted-foreground leading-relaxed">
              Nascemos para atender você! Corredor, atleta esportivo, dona de casa, empresário, colecionador e entusiasta, quem entende que cada par de tênis tem uma história.
            </div>
            
            <p className="mt-6 text-pretty text-muted-foreground leading-relaxed">
              Filhos dessa terra, trazemos em nossas raízes a identidade amazônica e o procedimento técnico imbatível no tratamento de materiais sensíveis como camurça, couro nobuck e mesh tecnológico. Aqui, seu calçado recebe o tratamento certo!
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center items-center rounded-2xl border border-border bg-card p-6 text-center"
            >
              <ShieldCheck className="size-8 text-primary mb-3" />
              <span className="text-4xl font-black tracking-tight text-primary">100%</span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">Especializada</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center items-center rounded-2xl border border-border bg-card p-6 text-center"
            >
              <Sparkles className="size-8 text-primary mb-3" />
              <span className="text-3xl font-black tracking-tight text-primary">Premium</span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-2">Padrão de Qualidade</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}