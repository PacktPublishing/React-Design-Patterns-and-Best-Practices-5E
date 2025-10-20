# Advanced State Management Techniques

This project demonstrates advanced state management techniques in React 19, based on comprehensive examples from the chapter "Advanced State Management Techniques".

## Features

### 1. **use Hook for Async Operations**
- Revolutionary new hook for handling promises
- Seamless integration with Suspense boundaries
- Advanced patterns for dependent API calls
- Error handling with Error Boundaries

### 2. **Performance Optimization**
- `useDeferredValue` for non-urgent updates
- Large dataset handling with deferred rendering
- Combining with `useTransition` for granular control
- Real-time search and filtering optimization

### 3. **Ref Callbacks**
- ResizeObserver integration
- Cleanup and side effect management
- Resource management patterns

### 4. **Redux Toolkit**
- Modern Redux setup with TypeScript
- Async operations with `createAsyncThunk`
- RTK Query for data fetching and caching
- Predictable state updates

### 5. **Context API**
- Modern context patterns
- Performance optimization with split contexts
- Theme management
- User authentication state

### 6. **Zustand**
- Lightweight state management
- Shopping cart implementation
- Async operations and selectors
- Persistence with middleware

### 7. **Best Practices**
- State locality principles
- Derived state handling
- Selective persistence strategies
- Testing state logic

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the examples.

## Project Structure

\`\`\`
├── app/
│   ├── api/          # Mock API routes
│   ├── page.tsx      # Main page with all examples
│   └── layout.tsx    # Root layout
├── components/
│   └── examples/     # All example components
├── contexts/         # Context API implementations
├── stores/           # Zustand stores
├── store/            # Redux Toolkit setup
├── hooks/            # Custom hooks
└── types/            # TypeScript types
\`\`\`

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - Latest React features
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - Complex state management
- **Zustand** - Lightweight state management
- **shadcn/ui** - UI components

## Key Concepts

### State Management Hierarchy
1. **Local State** - `useState` for component-level data
2. **Context API** - Theme, auth, and shared state
3. **Zustand** - Lightweight global state
4. **Redux Toolkit** - Complex applications with middleware

### Performance Patterns
- Use `useDeferredValue` for expensive computations
- Implement selective subscriptions with Zustand
- Memoize derived values
- Split contexts by concern

### Async Patterns
- Leverage the `use` hook with Suspense
- Handle errors with Error Boundaries
- Create custom async hooks
- Implement proper loading states

## Learn More

This project implements all code examples from the "Advanced State Management Techniques" chapter, providing a comprehensive reference for modern React state management patterns.
