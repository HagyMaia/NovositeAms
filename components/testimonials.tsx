"use client"

import { Star, CheckCircle, Quote, ExternalLink, Image as ImageIcon } from "lucide-react"
import { GoogleIcon } from "@/components/icons"

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Amazon+Shoes+lavanderia+de+tenis/@-3.0939601,-60.0092832,17z/data=!4m8!3m7!1s0x926c1ba7f72a64c5:0xb34a9f91c1a2ba38!8m2!3d-3.0939601!4d-60.0092832!9m1!1b1!16s%2Fg%2F11nq86xq86?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"

const realGoogleReviews = [
  {
    name: "Roseane Esquerdo Margalho",
    role: "Avaliação no Google · 1 foto anexada",
    initials: "RM",
    comment:
      "Ótimo atendimento, entrega rápida, resultado satisfatório, gostei muito do resultado do meu tênis. Recomendo com toda certeza.",
    rating: 5,
    timeAgo: "3 meses atrás",
    hasPhoto: true,
    photoCaption: "Nike Air Force 1 Restaurado",
  },
  {
    name: "Jefferson Castro",
    role: "Avaliação no Google",
    initials: "JC",
    comment:
      "Atendimento de excelência, serviço de qualidade. Uma entrega de resultado perfeita.",
    rating: 5,
    timeAgo: "3 meses atrás",
    hasPhoto: false,
  },
  {
    name: "Araujo",
    role: "Local Guide · 5 avaliações no Google",
    initials: "A",
    comment:
      "Serviço de qualidade com preço justo. Ótimo atendimento. Recomendo.",
    rating: 5,
    timeAgo: "3 meses atrás",
    hasPhoto: false,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Header com Selo Oficial Google Reviews */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            <GoogleIcon className="size-4" />
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold">5.0</span>
            <span className="text-muted-foreground">· Avaliações Verificadas no Google</span>
          </div>
          
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Quem confia no nosso padrão
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground text-sm sm:text-base">
            Depoimentos reais deixados por clientes no nosso perfil oficial do Google Meu Negócio em Manaus.
          </p>
        </div>

        {/* Grade das 3 Avaliações Reais */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 items-stretch">
          {realGoogleReviews.map((t, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground ml-1">
                      {t.timeAgo}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                    <GoogleIcon className="size-3.5" />
                    <span>Google</span>
                  </div>
                </div>

                <Quote className="size-7 text-primary/25 my-4" />

                <p className="text-sm text-foreground leading-relaxed italic">
                  &quot;{t.comment}&quot;
                </p>

                {t.hasPhoto && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                    <ImageIcon className="size-3" />
                    <span>Foto do tênis entregue anexada</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <CheckCircle className="size-3.5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Ver Todas as Avaliações no Google Maps */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-6 py-3.5 text-xs sm:text-sm font-bold text-foreground shadow-md transition-all hover:bg-card/80 hover:border-primary/50 hover:text-primary hover:scale-105"
          >
            <GoogleIcon className="size-4" />
            <span>Ver todas as avaliações no Google Maps</span>
            <ExternalLink className="size-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
