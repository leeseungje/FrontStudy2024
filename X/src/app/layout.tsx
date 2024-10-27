import React from "react"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import AuthSession from "./_component/AuthSession"
import { MSWComponent } from "./_component/MSWComponent"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "무슨 일이 일어나고 있나요?",
  description: "샬라샬라",
}

export interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  )
}

export default RootLayout
