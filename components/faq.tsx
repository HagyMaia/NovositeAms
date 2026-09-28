"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SITE_CONFIG } from "@/lib/constants"

const faqs = [
  {
    q: "Qual é o prazo médio de higienização e entrega?",
    a: "Nosso prazo padrão é de 48h a 72h úteis após a coleta. Esse período garante o tempo necessário para higienização artesanal detalhada, tratamento na câmara de ozônio e secagem com temperatura controlada.",
  },
  {
    q: "Vocês buscam e entregam em quais bairros de Manaus?",
    a: "Atendemos toda a cidade de Manaus com nossa rota delivery diária, incluindo Adrianópolis, Ponta Negra, Vieiralves, Parque 10, Aleixo, Flores, Centro, Dom Pedro, Chapada e demais regiões.",
  },
  {
    q: "É seguro para tênis de camurça (suede), couro nobuck e tecidos nobres?",
    a: "Sim, absolutamente. Utilizamos escovas de cerdas animais e cerdas macias importadas com espumas neutras e produtos biodegradáveis específicos para cada material, preservando a textura aveludada e a cor original sem desbotar.",
  },
  {
    q: "O que é o tratamento com ozônio e como funciona?",
    a: "O ozônio é um potente sanitizante natural que penetra nas fibras e na palmilha do calçado, eliminando 99,9% das bactérias e fungos causadores de mau odor, sem utilizar produtos químicos agressivos.",
  },
  {
    q: "A Hidroblindagem realmente protege contra água e chuva?",
    a: "Sim! A hidroblindagem cria um nano-escudo protetor invisível sobre o tecido que faz os líquidos escorregarem sem penetrar. É a proteção ideal para o clima chuvoso e as poças de Manaus.",
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos PIX, cartões de crédito e débito das principais bandeiras. O pagamento pode ser realizado no momento da entrega ou por link seguro.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden w-full bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-semibold text-muted-foreground">
            <HelpCircle className="size-3.5 text-primary" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground text-sm sm:text-base">
            Tudo o que você precisa saber sobre o cuidado com seus tênis e o funcionamento do nosso serviço delivery.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-primary/50 bg-card" : "border-border bg-card/40 hover:border-border/80"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-foreground pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-0 text-sm sm:text-base leading-relaxed text-muted-foreground border-t border-border/40 mt-1">
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 text-center flex flex-col items-center">
          <p className="text-base font-bold text-foreground">Ainda tem alguma dúvida específica?</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Nossa equipe de especialistas está pronta para tirar qualquer dúvida sobre o material do seu calçado.
          </p>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-all"
          >
            <MessageCircle className="size-4 text-emerald-400" />
            Conversar com um especialista no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
