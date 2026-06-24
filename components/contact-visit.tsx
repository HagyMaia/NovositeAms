"use client"

import Image from "next/image"
import { Phone, MapPin, Mail } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/559293514747?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20a%20lavagem%20dos%20meus%20t%C3%AAnis."

export function ContactVisit() {
  return (
    <section id="contato" className="relative bg-background pt-16 pb-0">
      
      {/* FALE CONOSCO */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-24">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Fale Conosco</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Escolha o canal de sua preferência para tirar dúvidas técnicas ou solicitar rotas personalizadas.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 text-center flex flex-col items-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
              <Phone className="size-5" />
            </span>
            <h3 className="font-semibold text-lg">Telefone & WhatsApp</h3>
            <p className="text-xs text-muted-foreground mt-1 px-4">Orçamentos rápidos e agendamento emergencial.</p>
            <span className="text-primary font-bold mt-4 text-sm">(92) 9351-4747</span>
          </a>

          <div className="rounded-2xl border border-border bg-card p-6 text-center flex flex-col items-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <MapPin className="size-5" />
            </span>
            <h3 className="font-semibold text-lg">Nossa Sede</h3>
            <p className="text-xs text-muted-foreground mt-1 px-2">Av. Umberto Calderaro, 300, LOJA 10 - Adrianópolis, Manaus - AM.</p>
            <span className="text-muted-foreground/60 text-[10px] uppercase font-bold tracking-wider mt-4">(CONFIRA A LOCALIZAÇÃO PRESENCIAL ABAIXO)</span>
          </div>

          <a href="https://instagram.com/amazonshoes.lavanderia" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 text-center flex flex-col items-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </span>
            <h3 className="font-semibold text-lg">Instagram</h3>
            <p className="text-xs text-muted-foreground mt-1 px-4">Acompanhe bastidores diários e resultados reais.</p>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium mt-4 group-hover:bg-primary/20 transition-colors">@amazonshoes.lavanderia</span>
          </a>
        </div>
      </div>

      {/* VENHA NOS VISITAR */}
      <div className="border-t border-border bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Venha nos <span className="text-primary">Visitar</span></h2>
            <p className="mt-2 text-sm text-muted-foreground">Conheça nossa localização física premium e confira nossa grade oficial de horários.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            {/* Bloco 1: Imagem da Fachada */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden p-4 flex flex-col justify-between">
              <div className="mb-4">
                <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                  SEDE ADRIANÓPOLIS
                </span>
                <h3 className="text-xl font-bold">Atendimento Presencial Confortável</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Localizada em centro comercial de fácil acesso, ao lado de grandes parceiros locais.
                </p>
              </div>
              <div className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden border border-border">
                <Image 
                  src="/fachada.jpg"
                  alt="Fachada da Sede Amazon Shoes" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bloco 2: Imagem do Panfleto de Horários */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden p-4 flex flex-col items-center">
              <div className="w-full text-left mb-4">
                <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                  DISPONIBILIDADE
                </span>
                <h3 className="text-xl font-bold">Quadro Oficial de Horários</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Estamos de portas abertas para receber você e seus pares nos seguintes períodos.
                </p>
              </div>
              <div className="relative w-full aspect-[9/16] max-h-[480px] rounded-xl overflow-hidden border border-border bg-background">
                <Image 
                  src="/horarios.jpg" 
                  alt="Horários de Funcionamento Amazon Shoes" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-sm font-black tracking-wider text-foreground flex items-center gap-2">
              <Image src="/logo.png" alt="" width={20} height={20} className="object-contain" />
              AMZ.SHOES.LAVANDERIA
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              Av. Umberto Calderaro, 300, LOJA 10 - Adrianópolis, Manaus - AM, 69079-265.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">E-mail Comercial</span>
            <a href="mailto:AMZ.SHOES.LAVANDERIA@GMAIL.COM" className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
              <Mail className="size-3.5" /> AMZ.SHOES.LAVANDERIA@GMAIL.COM
            </a>
          </div>
        </div>
      </footer>

    </section>
  )
}