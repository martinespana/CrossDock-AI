import type { NextConfig } from 'next';
const config: NextConfig = {
  output: process.env.CROSSDOCK_BUILD_TARGET === 'static' ? 'export' : 'standalone',
  outputFileTracingRoot: process.cwd(),
  // Include both ESM and CommonJS helper exports used by Node 22+ at runtime.
  outputFileTracingIncludes: {
    '/*': [
      './node_modules/@swc/helpers/**/*',
      './node_modules/.pnpm/@swc+helpers@*/node_modules/@swc/helpers/**/*',
      './node_modules/tslib/**/*',
      './node_modules/.pnpm/tslib@*/node_modules/tslib/**/*',
    ],
  },
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default config;
