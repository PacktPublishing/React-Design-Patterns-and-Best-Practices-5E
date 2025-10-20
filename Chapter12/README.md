# Dynamic API Example

This project demonstrates building a dynamic and automatic REST API using Express 5, PostgreSQL, and Drizzle ORM. The server introspects the database schema to generate CRUD, relational, and search endpoints automatically, while also showcasing caching, validation, authentication scaffolding, and rate limiting.

## Features

- **Express 5 server** with security, compression, and JSON parsing middleware.
- **Environment validation** via Zod to guarantee configuration safety.
- **Type-safe Drizzle ORM schema** for users and posts, including indexes and full-text search.
- **Automatic CRUD route factory** that validates payloads and generates endpoints per table.
- **Dynamic relational endpoints** to fetch nested resources.
- **In-memory caching** with automatic invalidation on updates.
- **PostgreSQL full-text search** endpoint with pagination metadata.
- **Authentication, validation, and rate limiting middleware** ready for production hardening.
- **Drizzle migrations** and Docker Compose configuration for a local PostgreSQL instance.

## Getting Started

1. Copy `.env.example` to `.env` and update the values as needed.
2. Start PostgreSQL with Docker:

   ```bash
   docker-compose up -d
   ```

3. Install dependencies and run database migrations:

   ```bash
   npm install
   npm run generate
   npm run migrate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`.

## Scripts

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Start the server with automatic reloads.    |
| `npm run build`    | Compile TypeScript to JavaScript.           |
| `npm run start`    | Run the compiled server from `dist`.        |
| `npm run migrate`  | Execute database migrations.                |
| `npm run generate` | Generate Drizzle migration files.           |
| `npm run lint`     | Type-check the project with TypeScript.     |

## Project Structure

```
src/
  api/
    cached-factory.ts
    factory.ts
    protected-factory.ts
    relational-factory.ts
    relational.ts
    search.ts
  db/
    index.ts
    migrate.ts
    schema.ts
  middleware/
    auth.ts
    rateLimit.ts
    validate.ts
  utils/
    cache.ts
    pagination.ts
    responses.ts
  validation/
    schemas.ts
  config.ts
  index.ts
  server.ts
```

## Example Requests

- `GET /users` — List users with pagination and filtering.
- `POST /users` — Create a user with automatic validation.
- `GET /users/1/with-posts` — Fetch a user and their posts.
- `GET /search/posts?q=typescript` — Full-text search for posts.

These endpoints are generated automatically from the Drizzle schema. Adding a new table and migration instantly exposes CRUD endpoints without extra boilerplate.
