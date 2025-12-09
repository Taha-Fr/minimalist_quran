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
    {
      urlPattern: /^\/(?:$|read\/|surah\/).*/, // Match /, /read/*, /surah/*
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'app-pages-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
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
