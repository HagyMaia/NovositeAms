import Image from "next/image"
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight } from "lucide-react"
import { InstagramIcon } from "@/components/icons"
import { SITE_CONFIG } from "@/lib/constants"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-md w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-border/60">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#top" className="flex items-center gap-3">
              <div className="relative size-10">
                <Image
                  src="/logo.png"
                  alt="Amazon Shoes Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Amazon<span className="text-primary">Shoes</span>
              </span>
            </a>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Lavanderia especializada e restauração premium de calçados em Manaus. Cuidado artesanal com tecnologia de ozônio e hidroblindagem.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-2">
              <ShieldCheck className="size-4" />
              <span>Padrão 100% Especializado em Calçados</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">
              Navegação
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#formula" className="hover:text-primary transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-primary transition-colors">Antes & Depois</a>
              </li>
              <li>
                <a href="#planos" className="hover:text-primary transition-colors">Planos de Lavagem</a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-primary transition-colors">Simulador de Pedido</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">Perguntas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">
              Atendimento
            </p>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="size-3.5 text-primary" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="size-3.5 text-primary" />
                  <span className="truncate">{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <InstagramIcon className="size-3.5 text-primary" />
                  <span>{SITE_CONFIG.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.clientPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary font-medium hover:underline pt-1"
                >
                  <span>Portal do Cliente</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sede & Horários */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">
              Localização
            </p>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary transition-colors"
              >
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address.full}</span>
              </a>
              <div className="pt-2 flex items-start gap-2">
                <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>{SITE_CONFIG.hours.weekdays}</p>
                  <p>{SITE_CONFIG.hours.saturday}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-muted-foreground/80">
              Manaus - Amazonas · Brasil
            </span>
            <a
              href="/admin"
              className="text-[11px] uppercase tracking-wider text-muted-foreground/60 hover:text-primary transition-colors"
            >
              Acesso Gestor
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
