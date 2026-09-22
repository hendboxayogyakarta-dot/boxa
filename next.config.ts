import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder imagery for demo/mock products (lib/mock-data.ts).
      // Once Supabase Storage is connected, add its project domain here
      // (e.g. { hostname: "YOUR_PROJECT.supabase.co" }) and this entry
      // can be removed.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
