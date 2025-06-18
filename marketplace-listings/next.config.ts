import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-proxy.artblocks.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
