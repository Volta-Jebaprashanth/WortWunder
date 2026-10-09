import { defineConfig } from "vitest/config";

// Kept apart from vite.config.ts: unit tests cover plain TypeScript modules
// and don't need the TanStack Start, Nitro or Tailwind plugins.
export default defineConfig({
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
