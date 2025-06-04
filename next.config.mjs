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
    // Configure watchOptions to ignore system directories and fix Windows permission issues
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
        '**/C:/Program Files (x86)/**',
        // Additional Windows system directories
        '**/C:/Users/*/Local Settings/**',
        '**/C:/Users/*/My Documents/**',
        '**/C:/Users/*/Recent/**',
        '**/C:/Users/*/Templates/**',
        '**/C:/Users/*/Start Menu/**',
        '**/C:/System Volume Information/**',
        '**/C:/$Recycle.Bin/**',
        // Common permission-restricted directories
        '**/.Trash-*/**',
        '**/lost+found/**',
        '**/proc/**',
        '**/sys/**',
        '**/dev/**'
      ],
      // Reduce polling interval to avoid permission issues
      poll: isServer ? false : 1000,
      aggregateTimeout: 300
    };

    // Additional file system configuration for Windows
    if (process.platform === 'win32') {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
          os: false
        }
      };

      // Exclude problematic modules that might cause scanning issues
      config.externals = [
        ...(config.externals || []),
        ({ request }, callback) => {
          // Skip scanning certain system paths
          if (request && (
            request.includes('Application Data') ||
            request.includes('AppData') ||
            request.includes('Program Files')
          )) {
            return callback(null, `commonjs ${request}`);
          }
          callback();
        }
      ];
    }

    return config;
  }
}

export default nextConfig
