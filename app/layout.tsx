import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title:       'GANTS — Бизнесүүдийг Нэг Дор Холбоно',
  description:
    'Хамтрагч, харилцагч, хөрөнгө оруулагч болон үйлчилгээ үзүүлэгчдээ хэдхэн секундын дотор олоорой. Монголын бизнес холболтын шинэ экосистем.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
