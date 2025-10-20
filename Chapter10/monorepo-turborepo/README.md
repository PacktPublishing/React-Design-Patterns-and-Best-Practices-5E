# Monorepo

This repository is a Turbo monorepo configured with npm workspaces. It contains:

- `apps/frontend` – Next.js 16 application using the App Router, Tailwind CSS and TypeScript.
- `packages/ui` – Shared React UI components with Tailwind-ready styles.
- `packages/utils` – Shared TypeScript utilities.

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev -- --filter frontend
```

The Next.js app imports `@monorepo/ui` and `@monorepo/utils` directly from the workspace packages.
