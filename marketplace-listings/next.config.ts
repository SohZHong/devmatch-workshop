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
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
