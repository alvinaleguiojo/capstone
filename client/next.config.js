/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://www.benadryl.com.ph"],
  },
  swcMinify: true,
  env: {
    REALM_APP_ID: "application-0-hgucy",
    JWT_SECRET: "JWT_SECRET_STRINGS",
  },
};

module.exports = nextConfig;
