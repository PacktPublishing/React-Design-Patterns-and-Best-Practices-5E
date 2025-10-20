# NextAuth.js Authentication & Authorization System

A complete authentication and authorization system built with Next.js 15, NextAuth.js v5, and TypeScript, featuring role-based access control (RBAC), multiple OAuth providers, and secure session management.

## Features

- **Multiple Authentication Providers**
  - OAuth (GitHub, Google)
  - Credentials-based (email/password)
  - Account linking across providers

- **Role-Based Access Control (RBAC)**
  - Four roles: Admin, Editor, User, Guest
  - Granular permissions system
  - UI and API-level authorization

- **Security Best Practices**
  - JWT session strategy
  - bcrypt password hashing
  - Middleware route protection
  - Server-side validation
  - CSRF protection

- **Modern Architecture**
  - React Server Components
  - Server Actions
  - Edge-ready middleware
  - Type-safe with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OAuth app credentials (GitHub, Google)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy `.env.example` to `.env.local` and fill in your credentials:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Set up the database:
   \`\`\`bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for JWT encryption
- `NEXTAUTH_URL` - Your app URL
- `GITHUB_ID` / `GITHUB_SECRET` - GitHub OAuth credentials
- `GOOGLE_ID` / `GOOGLE_SECRET` - Google OAuth credentials

## Project Structure

\`\`\`
├── app/
│   ├── actions/          # Server actions
│   ├── api/              # API routes
│   ├── auth/             # Auth pages
│   ├── dashboard/        # Protected pages
│   └── providers/        # Client providers
├── components/           # React components
│   ├── rbac/            # RBAC components
│   └── ...
├── db/                   # Database schema
├── lib/                  # Utilities
│   ├── rbac/            # RBAC system
│   └── ...
├── auth.ts              # NextAuth config
└── middleware.ts        # Route protection
\`\`\`

## Usage

### Protecting Routes

Routes are protected in `middleware.ts`:

\`\`\`typescript
const protectedRoutes = ["/dashboard", "/profile"];
const adminRoutes = ["/admin"];
\`\`\`

### Checking Permissions in UI

\`\`\`tsx
<Can permission={Permission.PROJECT_DELETE}>
  <button>Delete</button>
</Can>
\`\`\`

### Protecting API Routes

\`\`\`typescript
export const GET = withErrorHandling(async () => {
  await requirePermission(Permission.USER_READ);
  // Your logic here
});
\`\`\`

### Server Actions

\`\`\`typescript
export async function deleteProject(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  // Your logic here
}
\`\`\`

## Role Permissions

- **Admin**: Full access to all features
- **Editor**: Create, read, update projects and users
- **User**: Create, read, update own projects
- **Guest**: Read-only access

## Learn More

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)

## License

MIT
