import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enables static export mode (replaces `next export`)
  devIndicators: false,
};

export default nextConfig;
