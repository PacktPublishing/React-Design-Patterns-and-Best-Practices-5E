# Mastering React Server Components

This project contains all the practical examples from Chapter 1: "Mastering React Server Components (RSC)".

## Examples Included

### 1. User Profile Comparison (`/examples/user-profile`)
- **Client Component**: Traditional approach with `useState` and `useEffect`
- **Server Component**: Modern approach with direct async data fetching
- Demonstrates the simplicity and performance benefits of Server Components

### 2. Blog Posts (`/examples/posts`)
- Server Component fetching data from an external API
- No loading states or useEffect needed
- Shows direct data fetching in Server Components

### 3. Contact Form (`/examples/contact`)
- Form submission using Server Actions with `'use server'`
- Demonstrates secure server-side form processing
- No API routes needed

### 4. Product Page (`/examples/products/1`)
- Hybrid approach mixing Server and Client Components
- Server Components for static content (product details, reviews)
- Client Component for interactive elements (like button)
- Shows the "islands of interactivity" pattern

### 5. Dashboard (`/examples/dashboard`)
- Streaming with React Suspense
- Progressive page loading
- Multiple independent data sources loading in parallel
- Demonstrates loading states with Suspense boundaries

### 6. Data Visualization (`/examples/charts`)
- Server-side chart generation
- Heavy libraries (like D3) stay on the server
- Only SVG/HTML sent to client
- Zero JavaScript for the chart itself

## Key Concepts Demonstrated

### Server Components
- Default in Next.js App Router
- Direct data fetching with async/await
- No JavaScript sent to client
- Can access backend resources directly

### Client Components
- Marked with `'use client'`
- Can use React hooks (useState, useEffect, etc.)
- Can handle browser events
- Required for interactivity

### Server Actions
- Marked with `'use server'`
- Functions that run on the server
- Can be called from Client Components
- Secure server-side operations

### Performance Patterns
- Parallel data fetching with Promise.all
- Streaming with Suspense
- Strategic caching
- Minimal client JavaScript

## Running the Project

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` to explore all examples.

## Technologies Used

- **Next.js 15**: App Router with full RSC support
- **React 19**: Server Components and Suspense
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components

## Learning Resources

This project accompanies Chapter 1 of "Mastering React Server Components". Each example includes:
- Inline comments explaining key concepts
- Comparison between old and new patterns
- Performance considerations
- Best practices

## Project Structure

\`\`\`
app/
  ├── examples/
  │   ├── user-profile/    # Client vs Server comparison
  │   ├── posts/           # Server Component data fetching
  │   ├── contact/         # Server Actions
  │   ├── products/        # Hybrid components
  │   ├── dashboard/       # Streaming with Suspense
  │   └── charts/          # Server-side rendering
  ├── api/
  │   └── users/           # API routes for client examples
  └── layout.tsx           # Root layout

components/
  └── examples/            # All example components

lib/
  ├── actions/             # Server Actions
  └── db.ts                # Database utilities (mock)
\`\`\`

## Key Takeaways

1. **Server Components are the default** - Use them unless you need interactivity
2. **Client Components for interactivity** - Use sparingly for best performance
3. **Server Actions for mutations** - No API routes needed
4. **Streaming improves UX** - Use Suspense for progressive loading
5. **Strategic caching** - Different strategies for different data types
