import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\/quran-pages\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'quran-pages',
        expiration: {
          maxEntries: 800,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },
    ...require("next-pwa/cache"),
  ],
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
