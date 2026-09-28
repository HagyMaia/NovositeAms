import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Features } from "@/components/features"
import { BeforeAfter } from "@/components/before-after"
import { About } from "@/components/about"
import { Pricing } from "@/components/pricing"
import { OrderCalculator } from "@/components/order-calculator"
import { CtaDelivery } from "@/components/cta-delivery"
import { Testimonials } from "@/components/testimonials"
import { Faq } from "@/components/faq"
import { ContactVisit } from "@/components/contact-visit"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Menu Superior Responsivo */}
      <SiteNav />
      
      <main>
        {/* Banner Principal */}
        <Hero />
        
        {/* Faixa Marquee */}
        <Marquee />
        
        {/* Pilares e Diferenciais */}
        <Features />

        {/* Galeria de Resultados Antes & Depois */}
        <BeforeAfter />
        
        {/* Quem Somos / Raízes de Manaus */}
        <About />
        
        {/* Planos de Lavagem */}
        <Pricing />

        {/* Simulador / Calculadora de Coleta */}
        <OrderCalculator />
        
        {/* Chamada para Coleta Delivery */}
        <CtaDelivery />

        {/* Prova Social / Depoimentos de Clientes */}
        <Testimonials />

        {/* Perguntas Frequentes */}
        <Faq />
        
        {/* Canais de Contato e Visita Presencial */}
        <ContactVisit />
      </main>
      
      {/* Rodapé Oficial Unificado */}
      <SiteFooter />

      {/* Botão Flutuante de WhatsApp com Radar */}
      <WhatsAppButton />
    </div>
  )
}