import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { About } from "@/components/about"       // Importa Quem Somos
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { CtaDelivery } from "@/components/cta-delivery"
import { ContactVisit } from "@/components/contact-visit" // Importa Contatos e Visita

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground scroll-smooth">
      <SiteNav />
      <Hero />
      <Marquee />
      <About />         {/* 3. Seção Quem Somos inserida aqui */}
      <Features />
      <Pricing />
      <CtaDelivery />
      <ContactVisit />   {/* 4 e 5. Seções de Contato, Visita e Rodapé */}
    </main>
  )
}