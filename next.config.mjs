import withPWAInit from "@ducanh2912/next-pwa";

// 1. Konfiguracja PWA
const withPWA = withPWAInit({
  dest: "public", // Gdzie mają się zapisać pliki PWA
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development", // Wyłączamy PWA podczas pracy lokalnej (npm run dev)
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

// 3. Eksportujemy połączoną konfigurację
export default withPWA(nextConfig);