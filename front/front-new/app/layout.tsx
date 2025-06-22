import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Verbo Solto',
  description: 'Created with Verbo Solto',
  generator: 'Verbo Solto',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
