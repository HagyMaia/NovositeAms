import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { PromoBanner } from "@/components/promo-banner"
import { Marquee } from "@/components/marquee"
import { Features } from "@/components/features"
import { About } from "@/components/about"
import { Pricing } from "@/components/pricing"
import { CtaDelivery } from "@/components/cta-delivery"
import { ContactVisit } from "@/components/contact-visit"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteNav />
      <main>
        <PromoBanner />
        <Hero />
        <Marquee />
        <Features />
        <About />
        <Pricing />
        <CtaDelivery />
        <ContactVisit />
      </main>
      <SiteFooter />
    </div>
  )
}