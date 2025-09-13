"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function SpeedInsightsWrapper() {
  const [SpeedInsights, setSpeedInsights] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Dynamically import SpeedInsights only on the client side
    import("@vercel/speed-insights/react")
      .then(({ SpeedInsights }) => {
        setSpeedInsights(() => SpeedInsights)
      })
      .catch((err) => {
        console.error("Failed to load SpeedInsights:", err)
      })
  }, [])

  if (!SpeedInsights) return null

  return <SpeedInsights />
}
