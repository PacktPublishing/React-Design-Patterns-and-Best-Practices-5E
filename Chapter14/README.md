# Task Manager - Automated Testing Project

This project demonstrates comprehensive automated testing for React applications, covering unit tests, integration tests, and end-to-end tests.

## Features

- **Task Management**: Create, complete, and delete tasks
- **Comprehensive Testing**: Unit, integration, and E2E tests
- **CI/CD Pipeline**: Automated testing with GitHub Actions
- **Cross-Browser Testing**: Tests run on Chrome, Firefox, and Safari

## Getting Started

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Testing

### Unit & Integration Tests

Run all Jest tests:

\`\`\`bash
npm test
\`\`\`

Run tests in watch mode:

\`\`\`bash
npm run test:watch
\`\`\`

Run tests with coverage:

\`\`\`bash
npm run test:coverage
\`\`\`

### End-to-End Tests

Run Playwright tests:

\`\`\`bash
npm run test:e2e
\`\`\`

Run Playwright tests with UI:

\`\`\`bash
npm run test:e2e:ui
\`\`\`

### Type Checking

\`\`\`bash
npm run type-check
\`\`\`

## Project Structure

\`\`\`
├── components/
│   ├── TaskItem.tsx          # Individual task component
│   ├── TaskItem.test.tsx     # Unit tests for TaskItem
│   ├── TaskForm.tsx          # Task creation form
│   ├── TaskForm.test.tsx     # Unit tests for TaskForm
│   ├── TaskList.tsx          # Main task list component
│   └── TaskList.test.tsx     # Integration tests for TaskList
├── e2e/
│   ├── task-manager.spec.ts          # Basic E2E tests
│   └── task-manager-advanced.spec.ts # Advanced E2E tests
├── .github/
│   └── workflows/
│       ├── test.yml           # Main test workflow
│       ├── quality.yml        # Code quality checks
│       └── deploy-preview.yml # Preview deployment workflow
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Jest setup file
└── playwright.config.ts       # Playwright configuration
\`\`\`

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Focus on component behavior and user interactions
- Use React Testing Library for accessibility-focused testing

### Integration Tests
- Test multiple components working together
- Verify state management and data flow
- Test complete user workflows

### End-to-End Tests
- Test the entire application in a real browser
- Simulate real user interactions
- Verify cross-browser compatibility

## CI/CD Pipeline

The project includes three GitHub Actions workflows:

1. **Test Suite**: Runs unit, integration, and E2E tests on every push and PR
2. **Code Quality**: Runs linting, type checking, and coverage checks
3. **Deploy Preview**: Creates preview deployments and runs E2E tests against them

## Coverage Requirements

The project enforces minimum code coverage of 80% for:
- Branches
- Functions
- Lines
- Statements

## Learn More

This project is based on Chapter 14: "Automated Testing for React Applications" and demonstrates best practices for testing React applications with Jest, React Testing Library, and Playwright.
