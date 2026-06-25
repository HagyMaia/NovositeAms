import { SiteNav } from "../components/site-nav"
import { Hero } from "../components/hero"
import { Marquee } from "../components/marquee"
import { Features } from "../components/features"
import { About } from "../components/about"
import { Pricing } from "../components/pricing"
import { CtaDelivery } from "../components/cta-delivery"
import { ContactVisit } from "../components/contact-visit"
import { SiteFooter } from "../components/site-footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Menu Superior */}
      <SiteNav />
      
      <main>
        {/* Banner Principal */}
        <Hero />
        
        {/* Faixa com texto em movimento */}
        <Marquee />
        
        {/* Vantagens / Diferenciais */}
        <Features />
        
        {/* Como Funciona / Sobre */}
        <About />
        
        {/* Planos de Lavagem */}
        <Pricing />
        
        {/* Chamada para Coleta Delivery */}
        <CtaDelivery />
        
        {/* Seção de Contato */}
        <ContactVisit />
      </main>
      
      {/* Rodapé */}
      <SiteFooter />
    </div>
  )
}