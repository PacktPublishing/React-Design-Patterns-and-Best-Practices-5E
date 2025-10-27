export default async () => {
  // Debug: what Node is Playwright actually running on?
  // You should see v18+/v20+/v23+ here in the test output
  console.log("[playwright] process.version:", process.version);

  // Ensure Web Streams exist (in case an older Node sneaks in)
  try {
    const web = await import("node:stream/web");
    (globalThis as any).TransformStream ??= (web as any).TransformStream;
    (globalThis as any).ReadableStream ??= (web as any).ReadableStream;
    (globalThis as any).WritableStream ??= (web as any).WritableStream;
  } catch {
    // super-fallback: should never hit on Node ≥18, but keeps CI green
    const pony = await import("web-streams-polyfill/ponyfill");
    (globalThis as any).TransformStream ??= (pony as any).TransformStream;
    (globalThis as any).ReadableStream ??= (pony as any).ReadableStream;
    (globalThis as any).WritableStream ??= (pony as any).WritableStream;
  }
};
