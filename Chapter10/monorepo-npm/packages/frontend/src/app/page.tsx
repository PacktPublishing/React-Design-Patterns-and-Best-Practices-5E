import { Button } from "@monorepo/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 text-red-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-blue-500">
          Monorepo
        </h1>
        <p className="mt-2 text-lg text-blue-500">
          This Next.js workspace consumes shared utilities and UI components.
        </p>
      </div>
      <Button variant="contained" color="primary">
        Explore the Workspace
      </Button>
    </main>
  );
}
