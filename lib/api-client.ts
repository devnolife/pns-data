// Helper functions for making API requests

// Simulated network delay range (ms)
const MIN_DELAY = 300
const MAX_DELAY = 1200

// Helper function to simulate network delay
const simulateNetworkDelay = async () => {
  const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY
  await new Promise((resolve) => setTimeout(resolve, delay))
}

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Base API request function
export const apiRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  options: {
    simulateDelay?: boolean
    requiresAuth?: boolean
    formData?: boolean
  } = {
    simulateDelay: true,
    requiresAuth: true,
    formData: false,
  },
) => {
  try {
    // Simulate network delay if enabled
    if (options.simulateDelay) {
      await simulateNetworkDelay()
    }

    // Prepare headers
    const headers: Record<string, string> = {}

    if (!options.formData) {
      headers["Content-Type"] = "application/json"
    }

    // Add auth token if required
    if (options.requiresAuth) {
      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }
      headers["Authorization"] = `Bearer ${token}`
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
    }

    // Add body if needed
    if (method !== "GET" && data) {
      if (options.formData) {
        // For FormData, don't stringify
        requestOptions.body = data
      } else {
        requestOptions.body = JSON.stringify(data)
      }
    }

    // Make the request
    const response = await fetch(url, requestOptions)

    // Parse response
    const responseData = await response.json()

    // Check if response is successful
    if (!response.ok) {
      throw new Error(responseData.message || "An error occurred")
    }

    return responseData
  } catch (error) {
    console.error(`API Request Error (${url}):`, error)
    throw error
  }
}

// Types
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  training?: string
  class?: string
  phone?: string
}

export interface GuestbookEntry {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export interface Collection {
  id: string
  title: string
  description: string
  coverImage: string
  category: string
  year: string
  batch: string
  fileUrl: string
  createdAt: string
  updatedAt: string
}

export interface Report {
  id: string
  title: string
  abstract: string
  reportType: string
  participants: string
  year: string
  batch: string
  coverImage: string
  fileUrl: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  userId: string
}

export interface VisitorStatistics {
  totalVisitors: number
  dailyVisitors: { date: string; count: number }[]
  monthlyVisitors: { month: string; count: number }[]
  visitorsByPurpose: { purpose: string; count: number }[]
}

export interface Folder {
  id: string
  name: string
  description: string
  parentId: string | null
  createdAt: string
  updatedAt: string
}

// API client
export const apiClient = {
  // Auth
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  register: async (userData: any): Promise<{ user: User; token: string }> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Registration failed")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    return
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = getAuthToken()
      if (!token) return null

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) return null

      const data = await response.json()
      return data.user
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  },

  // Guestbook
  submitGuestbookEntry: async (entry: { name: string; email: string; message: string }): Promise<GuestbookEntry> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
      id: Math.random().toString(36).substring(2, 9),
      name: entry.name,
      email: entry.email,
      message: entry.message,
      createdAt: new Date().toISOString(),
    }
  },

  getGuestbookEntries: async (): Promise<GuestbookEntry[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        message: "Great collection of resources!",
        createdAt: "2023-05-15T10:30:00Z",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        message: "I found exactly what I was looking for. Thank you!",
        createdAt: "2023-05-14T15:45:00Z",
      },
      {
        id: "3",
        name: "Robert Johnson",
        email: "robert@example.com",
        message: "The digital collection is very well organized.",
        createdAt: "2023-05-13T09:15:00Z",
      },
    ]
  },

  // Collections
  getPublicCollections: async (filters?: any): Promise<Collection[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 700))

    const collections = [
      {
        id: "1",
        title: "CPNS Training Guidelines",
        description: "Comprehensive guidelines for CPNS training programs",
        coverImage: "/cpns-training-guidelines.png",
        category: "Training",
        year: "2023",
        batch: "1",
        fileUrl: "/files/cpns-guidelines.pdf",
        createdAt: "2023-01-15T10:30:00Z",
        updatedAt: "2023-01-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Leadership Principles",
        description: "Core leadership principles for public service",
        coverImage: "/leadership-principles.png",
        category: "Leadership",
        year: "2022",
        batch: "3",
        fileUrl: "/files/leadership.pdf",
        createdAt: "2022-11-20T14:45:00Z",
        updatedAt: "2022-11-20T14:45:00Z",
      },
      {
        id: "3",
        title: "Research Methodology",
        description: "Research methodology for public policy analysis",
        coverImage: "/research-methodology.png",
        category: "Research",
        year: "2023",
        batch: "2",
        fileUrl: "/files/research-methods.pdf",
        createdAt: "2023-03-05T09:15:00Z",
        updatedAt: "2023-03-05T09:15:00Z",
      },
      {
        id: "4",
        title: "Final Project Guidelines",
        description: "Guidelines for completing the final project",
        coverImage: "/final-project-guidelines.png",
        category: "Project",
        year: "2023",
        batch: "1",
        fileUrl: "/files/project-guidelines.pdf",
        createdAt: "2023-02-10T11:20:00Z",
        updatedAt: "2023-02-10T11:20:00Z",
      },
      {
        id: "5",
        title: "Assessment Criteria",
        description: "Criteria for assessing participant performance",
        coverImage: "/assessment-criteria.png",
        category: "Assessment",
        year: "2022",
        batch: "4",
        fileUrl: "/files/assessment.pdf",
        createdAt: "2022-12-18T13:40:00Z",
        updatedAt: "2022-12-18T13:40:00Z",
      },
    ]

    // Apply filters if provided
    if (filters) {
      let filtered = [...collections]

      if (filters.query) {
        const query = filters.query.toLowerCase()
        filtered = filtered.filter(
          (c) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query),
        )
      }

      if (filters.category && filters.category !== "all") {
        filtered = filtered.filter((c) => c.category === filters.category)
      }

      if (filters.year && filters.year !== "all") {
        filtered = filtered.filter((c) => c.year === filters.year)
      }

      if (filters.batch && filters.batch !== "all") {
        filtered = filtered.filter((c) => c.batch === filters.batch)
      }

      return filtered
    }

    return collections
  },

  // Other methods would be implemented similarly
  // ...
}

export default apiClient
