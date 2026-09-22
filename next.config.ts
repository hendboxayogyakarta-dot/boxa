import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder imagery for demo/mock products (lib/mock-data.ts).
      { protocol: "https", hostname: "picsum.photos" },
      // Any Supabase project's storage domain (https://<ref>.supabase.co/...).
      // Wildcard so this works regardless of which project you're on.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
