"use client";
import { Button } from "@monorepo/ui";

export default function Page() {
  return (
    <section className="space-y-6">
      <div className="text-red-900">Hello, Developer!</div>
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-slate-400">
          Shared utilities
        </p>
        <h2 className="text-3xl font-bold">Hello, Developer!</h2>
        <p className="max-w-2xl text-slate-300">
          This page is rendered by the Next.js app in{" "}
          <code className="rounded bg-slate-800 px-1">apps/frontend</code> and
          reuses code from the shared{" "}
          <code className="rounded bg-slate-800 px-1">@monorepo/ui</code> and{" "}
          <code className="rounded bg-slate-800 px-1">@monorepo/utils</code>{" "}
          packages.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => alert("Clicked!")}
          variant="contained"
          color="primary"
        >
          Primary action
        </Button>
        <Button variant="secondary">Secondary action</Button>
      </div>
    </section>
  );
}
