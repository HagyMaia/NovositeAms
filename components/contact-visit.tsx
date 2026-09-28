"use client"

import Image from "next/image"
import { Phone, MapPin, Clock, ExternalLink, Navigation } from "lucide-react"
import { InstagramIcon } from "@/components/icons"
import { SITE_CONFIG } from "@/lib/constants"

export function ContactVisit() {
  return (
    <section id="contato" className="relative bg-background pt-16 pb-20 overflow-hidden w-full">
      
      {/* FALE CONOSCO */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mb-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Canais de Atendimento
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Fale Conosco</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Escolha o canal de sua preferência para orçamentos, dúvidas técnicas ou rotas delivery personalizadas.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Card: WhatsApp */}
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-xl text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all mb-4">
                <Phone className="size-6" />
              </span>
              <h3 className="font-bold text-lg">WhatsApp Delivery</h3>
              <p className="text-xs text-muted-foreground mt-2 px-2">
                Agendamento de coletas com confirmação rápida e rastreio.
              </p>
            </div>
            <span className="text-primary font-bold mt-6 text-sm group-hover:underline flex items-center gap-1">
              {SITE_CONFIG.phone} ➔
            </span>
          </a>

          {/* Card: Sede Adrianópolis */}
          <a
            href={SITE_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-xl text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all mb-4">
                <MapPin className="size-6" />
              </span>
              <h3 className="font-bold text-lg">Sede Adrianópolis</h3>
              <p className="text-xs text-muted-foreground mt-2 px-2">
                {SITE_CONFIG.address.full}
              </p>
            </div>
            <span className="text-primary font-bold mt-6 text-sm group-hover:underline flex items-center gap-1">
              Abrir no Google Maps <ExternalLink className="size-3.5" />
            </span>
          </a>

          {/* Card: Instagram */}
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-xl text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all mb-4">
                <InstagramIcon className="size-6" />
              </span>
              <h3 className="font-bold text-lg">Instagram Oficial</h3>
              <p className="text-xs text-muted-foreground mt-2 px-2">
                Acompanhe bastidores diários, restaurações em vídeo e novidades.
              </p>
            </div>
            <span className="rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {SITE_CONFIG.instagramHandle}
            </span>
          </a>
        </div>
      </div>

      {/* VENHA NOS VISITAR */}
      <div className="border-t border-border bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Atendimento Físico
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Venha nos <span className="text-primary">Visitar</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Conheça nossa estrutura em Adrianópolis e trace sua rota direta no GPS.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-stretch max-w-5xl mx-auto">
            
            {/* Bloco 1: Imagem da Fachada */}
            <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-lg">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    SEDE ADRIANÓPOLIS
                  </span>
                </div>
                <h3 className="text-xl font-bold">Atendimento Presencial Confortável</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Localizada em galeria comercial de fácil acesso e estacionamento em Adrianópolis.
                </p>
              </div>
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border">
                <Image 
                  src="/fachada.jpeg"
                  alt="Fachada da Sede Amazon Shoes em Manaus" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Bloco 2: Imagem do Quadro de Horários */}
            <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-lg">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-primary/20 flex items-center gap-1">
                    <Clock className="size-3" /> FUNCIONAMENTO
                  </span>
                </div>
                <h3 className="text-xl font-bold">Grade Oficial de Horários</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Portas abertas para receber seus pares de segunda a sábado.
                </p>
              </div>
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-background">
                <Image 
                  src="/horarios.jpeg" 
                  alt="Horários de Funcionamento Amazon Shoes" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* Botão de Destaque para abrir no Google Maps */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <a
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105"
            >
              <Navigation className="size-5" />
              Traçar Rota no Google Maps
              <ExternalLink className="size-4" />
            </a>

            <span className="text-xs text-muted-foreground">
              {SITE_CONFIG.address.full}
            </span>
          </div>

        </div>
      </div>

    </section>
  )
}