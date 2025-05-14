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
    domains: ['placeholder.com'],
    unoptimized: true, // Disable image optimization for static export
  },
  // Enable static exports for static site generation
  output: 'export',
  // Disable server-side rendering for the entire app
  trailingSlash: true,
}

export default nextConfig
