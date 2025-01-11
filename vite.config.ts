import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare"
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    cloudflareDevProxy({
      getLoadContext({ context }) {
        return { cloudflare: context.cloudflare };
      },
    }),
    

    reactRouter(),
    svgr(),
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