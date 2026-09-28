import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'

// Configuração das fontes premium para performance máxima
const geistSans = Geist({ 
  variable: '--font-geist-sans', 
  subsets: ['latin'] 
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Metadados Otimizados para SEO Local (Manaus - AM) e Domínio Oficial
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Amazon Shoes — Lavanderia e Restauração Premium de Tênis em Manaus',
    template: '%s | Amazon Shoes Lavanderia',
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    'lavanderia de tenis manaus',
    'lavagem de tenis manaus',
    'limpeza de tenis adrianopolis',
    'restauracao de tenis',
    'hidroblindagem tenis',
    'ozonio anti odor tenis',
    'delivery lavanderia manaus',
    'amazon shoes lavanderia',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Amazon Shoes — Seus tênis novos de novo em Manaus',
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/sneaker-hero.png',
        width: 1200,
        height: 630,
        alt: 'Amazon Shoes Lavanderia de Tênis Manaus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon Shoes — Lavanderia Premium de Tênis em Manaus',
    description: SITE_CONFIG.description,
    images: ['/sneaker-hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
}

// Structured Data (JSON-LD) para LocalBusiness no Google Manaus
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DryCleaningOrLaundry',
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.shortName,
  image: `${SITE_CONFIG.url}/logo.png`,
  '@id': SITE_CONFIG.url,
  url: SITE_CONFIG.url,
  telephone: '+5592993514747',
  priceRange: 'R$ 59,90 - R$ 79,90',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Umberto Calderaro, 300, LOJA 10',
    addressLocality: 'Manaus',
    addressRegion: 'AM',
    postalCode: '69079-265',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -3.1072,
    longitude: -60.0125,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '14:00',
    },
  ],
  sameAs: [
    SITE_CONFIG.instagram,
    SITE_CONFIG.mapsUrl,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${geistSans.variable} ${geistMono.variable} bg-background overflow-x-hidden w-full max-w-[100vw]`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden w-full max-w-[100vw]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}