import withPWAInit from "@ducanh2912/next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

// 1. Konfiguracja PWA
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

// 2. Konfiguracja Analyzera
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {

  },
  // Tu dodajemy domyślną optymalizację ikon Lucide (dla nowszych wersji Next.js)
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'], 
  },
};

// 3. Eksportujemy połączoną konfigurację (Analyzer owija PWA, PWA owija nextConfig)
export default analyzer(withPWA(nextConfig));