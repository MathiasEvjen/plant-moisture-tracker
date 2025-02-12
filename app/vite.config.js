import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        theme_color: "rgb(250, 235, 188)",
        background_color: "#ffffff",
        display: "standalone",
        "icons": [
        {
            "src": "../src/assets/leaves.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "../src/assets/leaves.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
});
