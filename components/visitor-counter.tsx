"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { incrementVisitorCount } from "@/actions/visitor-actions"

interface VisitorResult {
  success: boolean
  count: number
  source?: string
  error?: string
}

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<string>("")

  useEffect(() => {
    const trackVisit = async () => {
      try {
        console.log("Tracking visitor with file-based counter...")
        const result: VisitorResult = await incrementVisitorCount()

        console.log("Visitor tracking result:", result)

        setVisitorCount(result.count)
        setSource(result.source || "unknown")
      } catch (err) {
        console.error("Error in visitor tracking:", err)
        // Set a default count even if everything fails
        setVisitorCount(1)
        setSource("error")
      } finally {
        setLoading(false)
      }
    }

    trackVisit()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Users className="h-4 w-4" />
        <span>Counting visitors...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <Users className="h-4 w-4" />
      <span>{(visitorCount || 0).toLocaleString()} visitors</span>
      {process.env.NODE_ENV === "development" && <span className="text-xs opacity-50">({source})</span>}
    </div>
  )
}
