export interface User {
  name: string
  email: string
}

export interface Notification {
  id: string
  message: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  reviews: Review[]
}

export interface Review {
  id: string
  rating: number
  comment: string
  author: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  publishedAt: string
  author: {
    name: string
    avatar: string
  }
}

export interface DashboardStats {
  users: number
  revenue: number
  orders: number
}

export interface AnalyticsData {
  quickStats: {
    visitors: number
    pageViews: number
    bounceRate: number
    avgSession: string
  }
  chartData: {
    traffic: Array<{ date: string; visitors: number }>
    sources: Array<{ source: string; percentage: number }>
  }
  reports: Array<{
    id: string
    name: string
    lastUpdated: string
    status: "ready" | "processing" | "error"
  }>
}

export interface Department {
  id: string
  name: string
  email: string
}
