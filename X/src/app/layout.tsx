import React from "react"

import { Inter } from "next/font/google"

import AuthSession from "./_component/AuthSession"
import { MSWComponent } from "./_component/MSWComponent"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
