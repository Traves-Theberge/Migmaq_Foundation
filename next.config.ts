import type { NextConfig } from "next";

// Baseline hardening headers found missing in a pre-launch audit — the
// low-risk set that can't break anything already working (unlike a
// Content-Security-Policy, which would need real testing against
// Framer Motion, swagger-ui-react, and Tailwind's inline styles before
// it's safe to add, so it's deliberately left for a follow-up pass).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Supabase Storage serves the avatars bucket (migration 0004) from
    // <project-ref>.supabase.co — wildcarded since the project ref varies
    // per environment/deploy rather than being a fixed value in code.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
