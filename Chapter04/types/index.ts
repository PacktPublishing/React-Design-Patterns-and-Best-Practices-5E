// Shared types across the application
export interface User {
  id: string
  name: string
  email: string
  role?: "admin" | "user" | "guest"
  avatar?: string
}

export interface Post {
  id: number
  title: string
  content: string
  authorId: number
}

export interface Author {
  id: number
  name: string
  avatar: string
}

export interface Comment {
  id: number
  content: string
  authorId: number
  postId: number
}

export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  inventory?: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface DataPoint {
  id: number
  value: number
  category: string
  timestamp: Date
}
