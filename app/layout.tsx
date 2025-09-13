import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Click. Trust. Regret. - Cybersecurity Book by Oluwatoni Abraham",
    template: "%s | Click. Trust. Regret.",
  },
  description:
    "A chilling reflection of the decision-making moments that lead to scams. Learn how to protect yourself from cyber fraud with practical cybersecurity strategies and real-world examples.",
  keywords: [
    "cybersecurity",
    "scam prevention",
    "phishing",
    "online safety",
    "cyber fraud",
    "identity theft",
    "SMShing",
    "ransomware",
    "digital security",
    "online banking fraud",
    "dating scams",
    "cybersecurity book",
    "Oluwatoni Abraham",
  ],
  authors: [{ name: "Oluwatoni Abraham" }],
  creator: "Oluwatoni Abraham",
  publisher: "Amazon Kindle Direct Publishing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Click. Trust. Regret. - Cybersecurity Book by Oluwatoni Abraham",
    description:
      "A chilling reflection of the decision-making moments that lead to scams. Learn how to protect yourself from cyber fraud.",
    siteName: "Click. Trust. Regret.",
    images: [
      {
        url: "/images/book-cover.png",
        width: 400,
        height: 600,
        alt: "Click. Trust. Regret. Book Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Click. Trust. Regret. - Cybersecurity Book",
    description: "Learn how to protect yourself from cyber fraud with practical strategies.",
    images: ["/images/book-cover.png"],
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BGBF4HHXLG"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BGBF4HHXLG');
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ef4444" />
        <link rel="icon" href="/images/book-cover.png" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://amazon.com" />
        <link rel="dns-prefetch" href="https://producthunt.com" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <StructuredData />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
