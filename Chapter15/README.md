# React CI/CD Reference Project

This repository implements the full set of configuration snippets described in the "Continuous Integration and Delivery (CI/CD)" chapter. It includes GitHub Actions workflows, TypeScript configuration, Jest testing setup, Playwright end-to-end tests, and runtime configuration utilities for a React application.

## Available Scripts

- `npm run dev` – Start the Vite development server.
- `npm run build` – Type-check and build the production bundle.
- `npm run lint` – Run ESLint against the `src` directory.
- `npm run type-check` – Execute TypeScript in no-emit mode.
- `npm test` – Run the Jest test suite with coverage thresholds enforced.
- `npm run deploy:production` – Placeholder command for production deployments.
- `npm run deploy:staging` – Placeholder command for staging deployments.

## GitHub Actions Workflows

All workflows from the chapter are located in `.github/workflows/`:

- `ci-pipeline.yml` – Executes linting, type-checking, tests, and builds on pull requests and pushes.
- `deploy.yml` – Deploys to staging or production depending on the target branch.
- `e2e-tests.yml` – Runs Playwright end-to-end tests.
- `deploy-multi-environment.yml` – Demonstrates matrix-based multi-environment deployments.
- `production-deployment.yml` – Builds, tests, deploys, tags, and notifies for production releases.
- `rollback-production.yml` – Provides a manual rollback mechanism via deployment tags.

## Testing Configuration

- `jest.config.ts` – Configures Jest with TypeScript support, coverage thresholds, and module aliasing.
- `src/setupTests.ts` – Adds DOM matchers for React Testing Library.
- `e2e/dashboard.spec.ts` – Sample Playwright test suite that exercises dashboard flows.

## Runtime Configuration

- `src/config/environment.ts` – Type-safe build-time configuration handling.
- `src/hooks/useFeatureFlags.ts` – Runtime feature flag hook with graceful fallbacks.

These files mirror the patterns outlined in the chapter, providing a starting point for automating and deploying a production-grade React application.
