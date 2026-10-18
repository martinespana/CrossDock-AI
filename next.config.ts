import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default config;
