"use server"

import { promises as fs } from "fs"
import path from "path"

const COUNTER_FILE = path.join(process.cwd(), "visitor-count.txt")

// Simple file-based counter as fallback
async function getCountFromFile(): Promise<number> {
  try {
    const data = await fs.readFile(COUNTER_FILE, "utf-8")
    const count = Number.parseInt(data.trim(), 10)
    return isNaN(count) ? 0 : count
  } catch (error) {
    // File doesn't exist or can't be read, start with 0
    return 0
  }
}

async function saveCountToFile(count: number): Promise<void> {
  try {
    await fs.writeFile(COUNTER_FILE, count.toString(), "utf-8")
  } catch (error) {
    console.error("Failed to save count to file:", error)
  }
}

export async function incrementVisitorCount() {
  try {
    const currentCount = await getCountFromFile()
    const newCount = currentCount + 1
    await saveCountToFile(newCount)

    console.log(`Visitor count incremented: ${currentCount} -> ${newCount}`)

    return {
      success: true,
      count: newCount,
      source: "file",
    }
  } catch (error) {
    console.error("Error incrementing visitor count:", error)

    // Even if file operations fail, return a reasonable response
    return {
      success: true,
      count: 1,
      source: "fallback",
      error: String(error),
    }
  }
}

export async function getVisitorCount() {
  try {
    const count = await getCountFromFile()

    console.log(`Retrieved visitor count: ${count}`)

    return {
      success: true,
      count: count,
      source: "file",
    }
  } catch (error) {
    console.error("Error getting visitor count:", error)

    return {
      success: true,
      count: 0,
      source: "fallback",
      error: String(error),
    }
  }
}

// Health check function
export async function checkCounterHealth() {
  try {
    const count = await getCountFromFile()
    return {
      available: true,
      count: count,
      reason: "File-based counter is working",
    }
  } catch (error) {
    return {
      available: false,
      reason: String(error),
    }
  }
}
