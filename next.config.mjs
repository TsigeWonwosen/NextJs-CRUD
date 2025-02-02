/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //Enable hot-reloading in Docker
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   };
  //   return config;
  // },
  images: {
    unoptimized: true,
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
