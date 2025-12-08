import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  runtimeCaching: [
    {
      urlPattern: /\/quran-pages\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'quran-pages',
        expiration: {
          maxEntries: 604,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
