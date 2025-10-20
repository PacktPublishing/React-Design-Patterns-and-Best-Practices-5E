import type { User, Notification, Product, BlogPost, DashboardStats, AnalyticsData, Department, Review } from "../types"

// Mock delay to simulate network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockApi = {
  async getCurrentUser(): Promise<User | null> {
    await delay(300)
    return {
      name: "John Doe",
      email: "john@example.com",
    }
  },

  async getNotifications(): Promise<Notification[]> {
    await delay(200)
    return [
      { id: "1", message: "New message received" },
      { id: "2", message: "Update available" },
    ]
  },

  async getProduct(id: string): Promise<Product> {
    await delay(500)
    return {
      id,
      name: "Premium Wireless Headphones",
      description:
        "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
      price: 299.99,
      images: ["/wireless-headphones-front.png", "/wireless-headphones-side.png", "/wireless-headphones-case.png"],
      reviews: [
        {
          id: "1",
          rating: 5,
          comment: "Excellent sound quality and very comfortable!",
          author: "Sarah Johnson",
        },
        {
          id: "2",
          rating: 4,
          comment: "Great headphones, battery life could be better.",
          author: "Mike Chen",
        },
      ],
    }
  },

  async submitReview(productId: string, rating: number, comment: string): Promise<Review> {
    await delay(800)
    return {
      id: Date.now().toString(),
      rating,
      comment,
      author: "Current User",
    }
  },

  async getBlogPosts(page = 1): Promise<{ posts: BlogPost[]; totalPages: number }> {
    await delay(600)
    const posts: BlogPost[] = [
      {
        id: "1",
        title: "Getting Started with React Router 7",
        content:
          "React Router 7 brings powerful new features including server-side rendering, enhanced data loading patterns, and improved performance. In this comprehensive guide, we'll explore how to leverage these capabilities...",
        publishedAt: "2024-01-15",
        author: {
          name: "Jane Smith",
          avatar: "/avatar-woman.png",
        },
      },
      {
        id: "2",
        title: "Advanced Data Loading Patterns",
        content:
          "Learn how to implement sophisticated data loading strategies using React Router 7's loader system. We'll cover deferred loading, parallel data fetching, and error handling...",
        publishedAt: "2024-01-10",
        author: {
          name: "Alex Rodriguez",
          avatar: "/stylized-man-avatar.png",
        },
      },
      {
        id: "3",
        title: "Form Handling Best Practices",
        content:
          "Discover the best practices for handling forms in React Router 7. From validation to submission, we cover everything you need to know to build robust form experiences...",
        publishedAt: "2024-01-05",
        author: {
          name: "Emily Chen",
          avatar: "/avatar-woman-2.png",
        },
      },
    ]

    return {
      posts,
      totalPages: 3,
    }
  },

  async subscribeNewsletter(email: string): Promise<void> {
    await delay(1000)
    console.log("Subscribed:", email)
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await delay(400)
    return {
      users: 12543,
      revenue: 45678,
      orders: 892,
    }
  },

  async getAnalytics(): Promise<AnalyticsData> {
    await delay(800)
    return {
      quickStats: {
        visitors: 45231,
        pageViews: 123456,
        bounceRate: 42,
        avgSession: "3m 24s",
      },
      chartData: {
        traffic: [
          { date: "2024-01-01", visitors: 1200 },
          { date: "2024-01-02", visitors: 1500 },
          { date: "2024-01-03", visitors: 1800 },
        ],
        sources: [
          { source: "Direct", percentage: 45 },
          { source: "Search", percentage: 30 },
          { source: "Social", percentage: 25 },
        ],
      },
      reports: [
        {
          id: "1",
          name: "Monthly Traffic Report",
          lastUpdated: "2 hours ago",
          status: "ready",
        },
        {
          id: "2",
          name: "User Engagement Analysis",
          lastUpdated: "1 day ago",
          status: "ready",
        },
      ],
    }
  },

  async getDepartments(): Promise<Department[]> {
    await delay(300)
    return [
      { id: "sales", name: "Sales", email: "sales@example.com" },
      { id: "support", name: "Support", email: "support@example.com" },
      { id: "technical", name: "Technical", email: "tech@example.com" },
    ]
  },

  async submitContact(data: any): Promise<void> {
    await delay(1000)
    console.log("Contact form submitted:", data)
  },
}
