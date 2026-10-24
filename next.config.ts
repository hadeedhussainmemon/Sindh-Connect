import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // Prevents X-Powered-By: Next.js fingerprinting
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Clickjacking protection
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // MIME sniffing protection
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
