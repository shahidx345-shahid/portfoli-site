/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.com'],
    unoptimized: false, // Enable Vercel's image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable static exports for static site generation
  output: 'export',
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
  // Optional: Add base path if deploying to a subdirectory
  // basePath: '/portfolio',
  // Optional: Enable trailing slashes for better compatibility
  trailingSlash: true,
}

export default nextConfig
