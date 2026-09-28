"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, MessageCircle, Sparkles, Check, ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

const servicePlans = [
  { id: "basica", name: "Lavagem Básica", price: 59.9 },
  { id: "completa", name: "Completa (+ Ozônio)", price: 69.9, popular: true },
  { id: "premium", name: "Premium (+ Hidroblindagem)", price: 79.9 },
]

export function OrderCalculator() {
  const [pairs, setPairs] = useState(1)
  const [selectedPlanId, setSelectedPlanId] = useState("completa")
  const [addShield, setAddShield] = useState(false)
  const [addLaces, setAddLaces] = useState(false)

  const currentPlan = servicePlans.find((p) => p.id === selectedPlanId) || servicePlans[1]

  // Calculate pricing
  const baseCost = currentPlan.price * pairs
  const extrasCost = (addShield ? 20 * pairs : 0) + (addLaces ? 15 * pairs : 0)
  const discountMultiplier = pairs >= 3 ? 0.9 : pairs >= 2 ? 0.95 : 1
  const rawTotal = baseCost + extrasCost
  const finalTotal = rawTotal * discountMultiplier
  const hasDiscount = discountMultiplier < 1

  // Format WhatsApp message
  const extraTextList = []
  if (addShield) extraTextList.push("Hidroblindagem Extra")
  if (addLaces) extraTextList.push("Cadarços Novos")
  const extraFormatted = extraTextList.length > 0 ? ` + Adicionais (${extraTextList.join(", ")})` : ""

  const discountFormatted = hasDiscount
    ? ` (com ${Math.round((1 - discountMultiplier) * 100)}% de desconto progressivo)`
    : ""

  const whatsappMessage = encodeURIComponent(
    `Olá Amazon Shoes! Fiz uma simulação no site:\n` +
      `👟 Quantidade: ${pairs} par(es)\n` +
      `✨ Plano Escolhido: ${currentPlan.name}${extraFormatted}\n` +
      `💰 Total Estimado: R$ ${finalTotal.toFixed(2).replace(".", ",")}${discountFormatted}\n\n` +
      `Gostaria de confirmar a disponibilidade e agendar a coleta delivery!`
  )

  const directUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`

  return (
    <section id="calculadora" className="relative py-20 sm:py-28 overflow-hidden bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Calculator className="size-3.5" />
            Simulador Rápido de Coleta
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Simule seu pedido em segundos
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground text-sm sm:text-base">
            Monte o pacote ideal para seus calçados e envie diretamente para a nossa equipe de atendimento delivery.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
          <div className="space-y-8">
            
            {/* Step 1: Number of pairs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                1. Quantidade de Pares
              </label>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPairs(num)}
                    className={`flex flex-col items-center justify-center rounded-2xl border py-4 text-sm font-bold transition-all ${
                      pairs === num
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.02]"
                        : "border-border bg-background hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <span className="text-xl">{num}</span>
                    <span className="text-[10px] uppercase font-medium mt-0.5">
                      {num === 1 ? "Par" : num >= 4 ? "4+ Pares" : "Pares"}
                    </span>
                  </button>
                ))}
              </div>
              {pairs >= 2 && (
                <p className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="size-3" /> Desconto progressivo aplicado para múltiplos pares!
                </p>
              )}
            </div>

            {/* Step 2: Choose Plan */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                2. Selecione o Tipo de Tratamento
              </label>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {servicePlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                      selectedPlanId === plan.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border bg-background hover:border-border/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{plan.name}</span>
                        {selectedPlanId === plan.id && <Check className="size-4 text-primary" />}
                      </div>
                      <p className="text-lg font-black text-primary mt-2">
                        R$ {plan.price.toFixed(2).replace(".", ",")}
                        <span className="text-xs font-normal text-muted-foreground"> /par</span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                3. Serviços Adicionais (Opcional)
              </label>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setAddShield(!addShield)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                    addShield ? "border-primary bg-primary/10" : "border-border bg-background"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">Hidroblindagem Extra</p>
                    <p className="text-[11px] text-muted-foreground">Repele água e chuva de Manaus</p>
                  </div>
                  <span className="text-xs font-bold text-primary">+ R$ 20,00</span>
                </button>

                <button
                  onClick={() => setAddLaces(!addLaces)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                    addLaces ? "border-primary bg-primary/10" : "border-border bg-background"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">Cadarços Novos Premium</p>
                    <p className="text-[11px] text-muted-foreground">100% algodão ou elásticos</p>
                  </div>
                  <span className="text-xs font-bold text-primary">+ R$ 15,00</span>
                </button>
              </div>
            </div>

            {/* Total Summary Box & WhatsApp CTA */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Investimento Total Estimado
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    R$ {finalTotal.toFixed(2).replace(".", ",")}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs line-through text-muted-foreground">
                      R$ {rawTotal.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Coleta e entrega na sua porta inclusas em Manaus.
                </p>
              </div>

              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105"
              >
                <MessageCircle className="size-5" />
                Agendar via WhatsApp
                <ArrowRight className="size-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
