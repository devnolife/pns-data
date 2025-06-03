module.exports = {
  webpack: {
    watchOptions: {
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
    }
  }
} 
