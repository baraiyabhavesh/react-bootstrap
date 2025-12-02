/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Disable caching to work around disk space issues
    config.cache = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "https://t3-reactbootstrap.t3planet.com/",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
