import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Braeden Hall',
  description: "Braeden's personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&family=M+PLUS+1+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/cursor.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
