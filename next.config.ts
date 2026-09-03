import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Short URL printed on the Kentucky Recovery Rally QR code
        source: '/rally',
        destination: '/made180/KentuckyRecoveryRally',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
