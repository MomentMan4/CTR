"use client"

import { useEffect } from "react"

export function SpeedInsightsScript() {
  useEffect(() => {
    // Only run in production to avoid development issues
    if (process.env.NODE_ENV === "production") {
      import("@vercel/speed-insights")
        .then(({ injectSpeedInsights }) => {
          injectSpeedInsights()
        })
        .catch((err) => {
          console.error("Error loading Speed Insights:", err)
        })
    }
  }, [])

  return null
}
