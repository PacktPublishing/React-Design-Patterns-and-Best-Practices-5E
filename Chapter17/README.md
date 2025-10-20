# Production Deployment App

This is a production-ready Next.js application demonstrating deployment best practices from Chapter 17.

## Features

- 🚀 Server-side rendering with Next.js App Router
- 🎨 Responsive design with Tailwind CSS
- 📊 Performance monitoring with Web Vitals
- 🔍 SEO optimization with metadata
- 🛡️ Error boundaries and error handling
- 📈 Analytics integration
- 🔒 Security headers
- 🖼️ Optimized images with Next.js Image
- ⚡ Incremental Static Regeneration (ISR)

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Deploy to Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Click "Deploy"

### Environment Variables

For production, you may want to set:

- `NEXT_PUBLIC_API_URL` - Your API endpoint
- `NEXT_PUBLIC_ANALYTICS_ENDPOINT` - Analytics endpoint for performance monitoring

### Using Vercel CLI

Install the Vercel CLI:

\`\`\`bash
npm install -g vercel
\`\`\`

Deploy to preview:

\`\`\`bash
vercel
\`\`\`

Deploy to production:

\`\`\`bash
vercel --prod
\`\`\`

## Health Check

The app includes a health check endpoint at `/api/health` that returns:

- Current timestamp
- Application status
- Environment
- Git commit version (in Vercel)
- Uptime

## Performance Monitoring

The app includes Web Vitals monitoring that tracks:

- CLS (Cumulative Layout Shift)
- FID (First Input Delay)
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- TTFB (Time to First Byte)

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── health/          # Health check endpoint
│   │   └── products/        # Products API
│   ├── analytics/           # Analytics provider
│   ├── products/[id]/       # Product detail pages
│   ├── error.tsx            # Error boundary
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── PerformanceMonitor.tsx  # Web Vitals tracking
│   └── ProductGrid.tsx      # Product grid with filtering
├── lib/
│   └── api.ts               # API client functions
├── next.config.mjs          # Next.js configuration
└── vercel.json              # Vercel deployment config
\`\`\`

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Web Vitals](https://web.dev/vitals/)
- [Tailwind CSS](https://tailwindcss.com/docs)
