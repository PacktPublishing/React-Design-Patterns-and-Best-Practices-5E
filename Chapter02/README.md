# React 19 Actions & Server Interactions

This project contains all the code examples from Chapter 2: "Actions, Server Interactions, and Caching in React 19".

## Features Demonstrated

- **Server Actions** with `'use server'` directive
- **Form Handling** without API routes
- **Optimistic UI** with `useOptimistic` hook
- **Form State Management** with `useFormStatus` and `useActionState`
- **Server-Side Caching** strategies
- **React Query Integration** with Actions
- **Multi-Step Forms** with complex state
- **Next.js 16** features and patterns

## Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

2. **Set up your database:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database connection string
   \`\`\`

3. **Run Prisma migrations:**
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`

4. **Seed the database (optional):**
   \`\`\`bash
   npx prisma db seed
   \`\`\`

5. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── actions/              # Server Actions
│   ├── users.ts         # User CRUD operations
│   ├── profile.ts       # Profile updates
│   ├── posts.ts         # Post mutations
│   ├── comments.ts      # Comment handling
│   ├── formSteps.ts     # Multi-step form logic
│   ├── cart.ts          # Shopping cart actions
│   └── notifications.ts # Notification updates
├── components/          # React Components
│   ├── UserForm.tsx
│   ├── ProfileForm.tsx
│   ├── CommentList.tsx
│   ├── MultiStepForm.tsx
│   ├── ProductList.tsx
│   └── UserProfileWithQuery.tsx
├── data/               # Data fetching functions
│   └── getProductData.ts
├── lib/                # Utilities
│   └── db.ts          # Prisma client
├── prisma/            # Database schema
│   └── schema.prisma
└── app/               # Next.js App Router
    ├── page.tsx       # Home page
    ├── examples/      # Example pages
    └── products/      # Product pages
\`\`\`

## Key Concepts

### Server Actions

Server Actions allow you to run server-side code directly from your components:

\`\`\`typescript
'use server'

export async function createUser(formData: FormData) {
  const user = await db.user.create({
    data: {
      name: formData.get('name'),
      email: formData.get('email')
    }
  })
  return { success: true, user }
}
\`\`\`

### Optimistic UI

Update the UI immediately while the server processes the request:

\`\`\`typescript
const [optimisticComments, addOptimisticComment] = useOptimistic(
  comments,
  (state, newComment) => [...state, newComment]
)
\`\`\`

### Form Status

Track form submission state automatically:

\`\`\`typescript
const { pending } = useFormStatus()
\`\`\`

### Caching

Next.js 16 introduces new caching APIs:

\`\`\`typescript
revalidatePath('/posts')  // Revalidate with stale-while-revalidate
updateTag('user-123')     // Immediate cache update
refresh()                 // Refresh uncached data
\`\`\`

## Examples

Visit these pages to see the concepts in action:

- `/examples/user-form` - Basic Server Actions
- `/examples/profile-form` - Form with loading states
- `/examples/comments` - Optimistic UI updates
- `/examples/multi-step-form` - Complex form state
- `/examples/products` - Server Components with caching

## Technologies Used

- **Next.js 15.5** (with Next.js 16 patterns)
- **React 19** (with new hooks)
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (Database)
- **Tailwind CSS** (Styling)
- **shadcn/ui** (UI Components)
- **React Query** (Client-side caching)
- **Zod** (Validation)

## Learn More

- [React 19 Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Server Actions Guide](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Prisma Documentation](https://www.prisma.io/docs)

## License

MIT
