import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Footer from './components/footer' // Nou kite Footer a sèlman

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Konbit Agro AI Assistant',
  description: 'Konbit Agro AI Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            {/* Footer a ap rete anba chak paj nòmalman */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}