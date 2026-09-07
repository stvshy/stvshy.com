import withPWAInit from "@ducanh2912/next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Konfiguracja PWA
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  cacheStartUrl: false,
  dynamicStartUrl: false,
  reloadOnOnline: false,
  publicExcludes: ['!**/*'],
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    exclude: [/./],
    runtimeCaching: [
      {
        urlPattern: /\/_next\/static\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'immutable-assets-v1',
          expiration: { maxEntries: 128, maxAgeSeconds: 31536000 },
          cacheableResponse: { statuses: [200] },
        },
      },
      {
        urlPattern: /\/_next\/image\?.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'optimized-images-v1',
          expiration: { maxEntries: 64, maxAgeSeconds: 604800 },
          cacheableResponse: { statuses: [200] },
        },
      },
      {
        urlPattern: /\/(?:images|fonts|cursors)\/.*$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'public-assets-v1',
          expiration: { maxEntries: 64, maxAgeSeconds: 604800 },
          cacheableResponse: { statuses: [200] },
        },
      },
    ],
  },
});

// Konfiguracja Analyzera
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    qualities: [75],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 320, 384],
    minimumCacheTTL: 14400,
  },
  async headers() {
    return ['images', 'fonts', 'cursors'].map((directory) => ({
      source: `/${directory}/:path*`,
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
    }));
  },
  turbopack: {

  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'], 
  },
};

export default analyzer(withPWA(nextConfig));