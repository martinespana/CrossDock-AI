import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  // With output: 'export', Next uses this as the final static directory.
  // Keep deployment output deterministic across hosting environments.
  distDir: 'out',
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default config;
