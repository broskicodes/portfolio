"use client";

import './globals.css'
import { TerminalProvider } from '@/contexts/TermianlProvider'

// export const metadata: Metadata = {
//   title: 'Braeden Hall',
//   description: "Braeden's personal website",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Braeden Hall</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&family=M+PLUS+1+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/cursor.svg" />
      </head>
      <body>
        <TerminalProvider>
          {children}
        </TerminalProvider>
      </body>
    </html>
  )
}
