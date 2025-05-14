/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ['placeholder.com'],
  },
  // Enable static exports for static site generation
  output: 'export',
  // Disable server-side rendering for the entire app
  trailingSlash: true,
  // Add basePath if deploying to a subdirectory
  // basePath: '/portfolio',
  // Disable image optimization API
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  // Ensure all pages are included in the export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // Add other pages here if needed
    };
  },
}

export default nextConfig
