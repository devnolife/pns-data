import { NextResponse } from "next/server"

// Helper function to generate random visitor counts
const generateRandomVisitorCounts = (days: number) => {
  const today = new Date()
  const data = []

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const visitorCount = Math.floor(Math.random() * 100) + 50 // Random between 50-150

    data.unshift({
      date: date.toISOString().split("T")[0],
      count: visitorCount,
    })
  }

  return data
}

// Mock data for visitor statistics
const mockVisitorStatistics = {
  "7days": {
    totalVisitors: 742,
    uniqueVisitors: 523,
    averageVisitDuration: "5m 32s",
    bounceRate: "32%",
    topPages: [
      { page: "/public-collections", visits: 312 },
      { page: "/", visits: 287 },
      { page: "/guestbook", visits: 143 },
    ],
    visitorsByDay: generateRandomVisitorCounts(7),
  },
  "30days": {
    totalVisitors: 3254,
    uniqueVisitors: 2187,
    averageVisitDuration: "4m 58s",
    bounceRate: "35%",
    topPages: [
      { page: "/public-collections", visits: 1423 },
      { page: "/", visits: 1156 },
      { page: "/guestbook", visits: 675 },
    ],
    visitorsByDay: generateRandomVisitorCounts(30),
  },
  "90days": {
    totalVisitors: 9876,
    uniqueVisitors: 6543,
    averageVisitDuration: "5m 12s",
    bounceRate: "33%",
    topPages: [
      { page: "/public-collections", visits: 4321 },
      { page: "/", visits: 3456 },
      { page: "/guestbook", visits: 2099 },
    ],
    visitorsByDay: generateRandomVisitorCounts(90),
  },
}

// Helper function to convert JSON to CSV
const jsonToCsv = (data: any) => {
  if (!data || !data.visitorsByDay || !Array.isArray(data.visitorsByDay)) {
    return "No data available"
  }

  const headers = Object.keys(data.visitorsByDay[0]).join(",")
  const rows = data.visitorsByDay.map((row: any) => Object.values(row).join(",")).join("\n")

  return `${headers}\n${rows}`
}

export async function GET(request: Request) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "30days"
    const format = searchParams.get("format") || "csv"

    // Validate time range
    if (!["7days", "30days", "90days"].includes(timeRange)) {
      return NextResponse.json({ error: "Time range must be one of: 7days, 30days, 90days" }, { status: 400 })
    }

    // Validate format
    if (!["csv", "json"].includes(format)) {
      return NextResponse.json({ error: "Format must be either 'csv' or 'json'" }, { status: 400 })
    }

    const data = mockVisitorStatistics[timeRange as keyof typeof mockVisitorStatistics]

    if (format === "csv") {
      const csv = jsonToCsv(data)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename=visitor-statistics-${timeRange}.csv`,
        },
      })
    }

    return NextResponse.json(data, {
      headers: {
        "Content-Disposition": `attachment; filename=visitor-statistics-${timeRange}.json`,
      },
    })
  } catch (error) {
    console.error("Error in visitor-statistics download API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
