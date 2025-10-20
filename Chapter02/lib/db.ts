// This allows the examples to work without requiring database setup

type User = {
  id: string
  name: string
  email: string
  age?: number
  createdAt: Date
}

type Profile = {
  id: string
  userId: string
  bio: string | null
  preferences: Record<string, any>
  updatedAt: Date
}

type Post = {
  id: string
  title: string | null
  content: string | null
  favoriteCount: number
  updatedAt: Date
  createdAt: Date
}

type Comment = {
  id: string
  postId: string
  content: string
  author: string
  createdAt: Date
}

type Product = {
  id: string
  name: string
  category: string
  price: number
  images: string[]
  description: string
}

// In-memory storage
const storage = {
  users: new Map<string, User>(),
  profiles: new Map<string, Profile>(),
  posts: new Map<string, Post>(),
  comments: new Map<string, Comment>(),
  products: new Map<string, Product>(),
}

// Seed some initial data
const seedData = () => {
  // Add sample products
  const product1: Product = {
    id: "1",
    name: "Premium Headphones",
    category: "electronics",
    price: 299.99,
    images: ["/premium-headphones.png"],
    description: "High-quality wireless headphones with noise cancellation",
  }
  storage.products.set(product1.id, product1)

  // Add sample post
  const post1: Post = {
    id: "1",
    title: "Getting Started with React 19",
    content: "React 19 introduces powerful new features...",
    favoriteCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  storage.posts.set(post1.id, post1)
}

seedData()

// Mock Prisma client API
export const db = {
  user: {
    create: async ({ data }: { data: Partial<User> }) => {
      const id = `user-${Date.now()}`
      const user: User = {
        id,
        name: data.name || "",
        email: data.email || "",
        age: data.age,
        createdAt: new Date(),
      }
      storage.users.set(id, user)
      return user
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<User> }) => {
      const user = storage.users.get(where.id)
      if (!user) throw new Error("User not found")
      const updated = { ...user, ...data }
      storage.users.set(where.id, updated)
      return updated
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return storage.users.get(where.id) || null
    },
    findMany: async ({ where }: { where?: any } = {}) => {
      return Array.from(storage.users.values())
    },
  },
  profile: {
    update: async ({ where, data }: { where: { userId: string }; data: Partial<Profile> }) => {
      let profile = Array.from(storage.profiles.values()).find((p) => p.userId === where.userId)
      if (!profile) {
        profile = {
          id: `profile-${Date.now()}`,
          userId: where.userId,
          bio: null,
          preferences: {},
          updatedAt: new Date(),
        }
      }
      const updated = { ...profile, ...data, updatedAt: new Date() }
      storage.profiles.set(updated.id, updated)
      return updated
    },
  },
  post: {
    create: async ({ data }: { data: Partial<Post> }) => {
      const id = `post-${Date.now()}`
      const post: Post = {
        id,
        title: data.title || null,
        content: data.content || null,
        favoriteCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      storage.posts.set(id, post)
      return post
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const post = storage.posts.get(where.id)
      if (!post) throw new Error("Post not found")

      // Handle increment/decrement
      if (data.favoriteCount?.increment) {
        post.favoriteCount += data.favoriteCount.increment
      } else if (data.favoriteCount?.decrement) {
        post.favoriteCount -= data.favoriteCount.decrement
      }

      const updated = { ...post, ...data, updatedAt: new Date() }
      storage.posts.set(where.id, updated)
      return updated
    },
    findMany: async ({ where, include }: { where?: any; include?: any } = {}) => {
      const posts = Array.from(storage.posts.values())
      if (include?.reviews) {
        return posts.map((p) => ({ ...p, reviews: [] }))
      }
      return posts
    },
    findUnique: async ({ where, include }: { where: { id: string }; include?: any }) => {
      const post = storage.posts.get(where.id)
      if (!post) return null
      if (include?.reviews) {
        return { ...post, reviews: [] }
      }
      return post
    },
  },
  comment: {
    create: async ({ data }: { data: Partial<Comment> }) => {
      const id = `comment-${Date.now()}`
      const comment: Comment = {
        id,
        postId: data.postId || "",
        content: data.content || "",
        author: data.author || "Anonymous",
        createdAt: new Date(),
      }
      storage.comments.set(id, comment)
      return comment
    },
    findMany: async ({ where }: { where?: any } = {}) => {
      const comments = Array.from(storage.comments.values())
      if (where?.postId) {
        return comments.filter((c) => c.postId === where.postId)
      }
      return comments
    },
  },
  product: {
    findMany: async ({ where, include }: { where?: any; include?: any } = {}) => {
      let products = Array.from(storage.products.values())
      if (where?.category) {
        products = products.filter((p) => p.category === where.category)
      }
      if (include?.reviews) {
        return products.map((p) => ({ ...p, reviews: [] }))
      }
      return products
    },
    findUnique: async ({ where, include }: { where: { id: string }; include?: any }) => {
      const product = storage.products.get(where.id)
      if (!product) return null
      if (include?.reviews || include?.variants) {
        return { ...product, reviews: [], variants: [] }
      }
      return product
    },
  },
}
