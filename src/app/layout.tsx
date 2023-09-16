import './globals.css'
import type {Metadata} from 'next'
import {ReactNode} from "react";
import {WagmiAppConfig} from "@/components/layout/WagmiAppConfig";
import {Inter} from 'next/font/google'

export const metadata: Metadata = {
  title: 'Zort ZVaults',
  description: 'Zort ZVaults',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
    <body>
    <WagmiAppConfig>
      {children}
    </WagmiAppConfig>
    </body>
    </html>
  )
}
