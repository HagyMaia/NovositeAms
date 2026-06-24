import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

// Configuração das fontes premium para performance máxima
const geistSans = Geist({ 
  variable: '--font-geist-sans', 
  subsets: ['latin'] 
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Metadados Otimizados para SEO (Buscas no Google em Manaus)
export const metadata: Metadata = {
  title: 'Amazon Shoes — Seus tênis novos de novo',
  description:
    'Lavagem premium de tênis em Manaus. Cuidado artesanal, hidroblindagem e tecnologia avançada com coleta e entrega delivery.',
  generator: 'v0.app',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased selection:bg-primary selection:text-primary-foreground">
        {children}
        {/* Ativa o monitoramento de acessos apenas em produção */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}