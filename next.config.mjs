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
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  i18n: {
    locales: ['id'],
    defaultLocale: 'id',
  },
  experimental: {
    serverComponentsExternalPackages: ['prisma']
  },
  webpack: (config, { isServer, dev }) => {
    // Configure watchOptions to ignore system directories
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/C:/Users/*/Application Data/**',
        '**/C:/Users/*/AppData/**',
        '**/C:/ProgramData/**',
        '**/C:/Windows/**',
        '**/C:/Program Files/**',
        '**/C:/Program Files (x86)/**'
      ]
    };

    return config;
  }
}

export default nextConfig
