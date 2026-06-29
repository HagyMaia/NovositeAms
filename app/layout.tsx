import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { WhatsAppButton } from "@/components/whatsapp-button"

// Configuração das fontes
const geistSans = Geist({ 
  variable: '--font-geist-sans', 
  subsets: ['latin'] 
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Metadados
export const metadata: Metadata = {
  metadataBase: new URL('https://amazonshoes.vercel.app'),
  title: 'Amazon Shoes — Seus tênis novos de novo',
  description: 'Qualidade premium, cuidado artesanal e tecnologia avançada para devolver o brilho dos seus pares favoritos. Buscamos e entregamos na sua porta.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-primary selection:text-primary-foreground">
        {children}
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}