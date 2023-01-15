const withPWA = require('next-pwa')({
  dest: "public",
  disable: false,
  // register: true,
  // skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_URL: process.env.APP_URL,
    WS_URL: process.env.WS_URL,
  },
  images: {
    domains: ['githubusercontent.com','avatars.githubusercontent.com','localhost'],
  },
});
