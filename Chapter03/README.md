# React 19 Advanced Error Handling & Debugging

This project demonstrates all the concepts from Chapter 3: Advanced Error Handling and Debugging in React 19.

## Features

### 1. Error Boundaries
- **Basic Error Boundary**: Simple implementation with fallback UI
- **Advanced Error Boundary**: Error categorization, retry mechanisms, and contextual fallbacks

### 2. Root-Level Error Handlers
- `onCaughtError`: Handles errors caught by React's error handling system
- `onUncaughtError`: Handles critical errors that slip through

### 3. Hydration Debugging
- `ClientOnly` component for preventing hydration mismatches
- Examples of common hydration issues and solutions

### 4. Render Debugging
- `useRenderDebugger` hook for tracking component renders
- Identifies unnecessary re-renders and prop changes

### 5. Error Scenarios
- Async error handling
- Event handler errors
- Component lifecycle errors

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

\`\`\`
├── app/
│   ├── examples/          # Example pages for each concept
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page with navigation
├── components/
│   ├── error-boundaries/  # Error boundary components
│   └── hydration/         # Hydration-related components
├── hooks/
│   └── use-render-debugger.ts  # Custom debugging hook
└── lib/
    └── error-tracker.ts   # Error tracking utilities
\`\`\`

## Key Concepts

### Error Boundaries
Error boundaries catch JavaScript errors in child components, log errors, and display fallback UI.

### Root Error Handlers
React 19 introduces `onCaughtError` and `onUncaughtError` for application-level error management.

### Hydration Debugging
Server-rendered apps need special handling to prevent hydration mismatches between server and client.

### Performance Profiling
Use React DevTools and custom hooks to identify performance bottlenecks and unnecessary re-renders.

## Learn More

This project implements all code examples from the chapter, providing a hands-on way to explore React 19's error handling capabilities.
