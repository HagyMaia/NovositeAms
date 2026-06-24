import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { CtaDelivery } from "@/components/cta-delivery"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Marquee />
      <Features />
      <Pricing />
      <CtaDelivery />
      <SiteFooter />
    </main>
  )
}
