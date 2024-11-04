/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.mjs",
    clearMocks: true,
    restoreMocks: true,
  },
});
