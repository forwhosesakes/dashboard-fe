import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare"
import { getLoadContext } from "./load-context"

export default defineConfig({
  plugins: [
    cloudflareDevProxy({ getLoadContext }),

    reactRouter(),
    
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: [
  
    ],
    // exclude: ["@remix-run/dev"],
  },
  build: {
    rollupOptions: {
      // external: [/node:.*/, '@remix-run/dev', '@remix-run/server-runtime'],
      output: {
        manualChunks: {
  
          // 'email': ['@react-email/components','@react-email/render'],
        },
      },
    },
    sourcemap: true,
    target: 'esnext',
    minify: 'esbuild',
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  ssr: {
    
  
},
});