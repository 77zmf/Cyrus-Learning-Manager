/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
  base: "/Cyrus-Learning-Manager/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"]
  }
} as UserConfig & {
  test: {
    environment: "jsdom";
    globals: true;
    setupFiles: string[];
  };
});
