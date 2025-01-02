import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all domains (use cautiously)
      },
    ],
  },
};

export default nextConfig;
