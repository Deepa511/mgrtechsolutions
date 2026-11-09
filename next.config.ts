import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The combined /services page was removed: each service has its own page.
  // Old links land on the first service. Temporary, so a hub can come back.
  async redirects() {
    return [{ source: '/services', destination: '/services/website-design', permanent: false }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
