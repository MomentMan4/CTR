"use client"

import { useEffect } from "react"

const GA_MEASUREMENT_ID = "G-BGBF4HHXLG"

export function GoogleAnalytics() {
  useEffect(() => {
    // Check if gtag is already loaded
    if (typeof window !== "undefined" && !window.gtag) {
      // Create and append the gtag.js script
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script.async = true
      script.id = "google-analytics-script"
      document.head.appendChild(script)

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag("js", new Date())
      window.gtag("config", GA_MEASUREMENT_ID)
    }

    // Cleanup function
    return () => {
      const script = document.getElementById("google-analytics-script")
      if (script) {
        script.remove()
      }
    }
  }, [])

  return null
}

// TypeScript declaration for window.gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
