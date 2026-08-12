import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// This config used to carry three Manus-only plugins, all of them removed:
//
//   vitePluginManusRuntime   injected Manus's platform runtime into the built
//                            HTML — dead weight anywhere else.
//   manus-debug-collector    dev-server endpoint that wrote browser console and
//                            network logs into .manus-logs/.
//   manus-storage-proxy      served /manus-storage/* by presigning against
//                            Manus's Forge API using BUILT_IN_FORGE_API_KEY.
//                            Dev-server only, so those paths were broken in any
//                            production build. Every image reference now
//                            resolves locally under /images/ — see
//                            scripts/image-manifest.json.

export default defineConfig({
  plugins: [react(), tailwindcss(), jsxLocPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
