import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Compress static assets - GZIP compression
  compress: true,
  // Enable SWR caching for static assets
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Optimize React development
  reactStrictMode: true,
  // Stream response for faster perceived performance
  experimental: {
    optimizeServerReact: true,
  },
  images: {
    // Enable AVIF format for smaller file sizes (40% smaller than WebP)
    formats: ['image/avif', 'image/webp'],
    // Optimize image sizes for different devices
    deviceSizes: [320, 640, 750, 1080, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Remove placeholder for better LCP
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // HTTP headers for caching and security
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'font/:path*.woff2;charset=utf-8',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
  // Redirects for old routes
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
