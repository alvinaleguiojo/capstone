/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://www.benadryl.com.ph",
      "salangikopu.com",
      "getmeds.ph",
      "www.benadryl.com.ph",
      "http://localhost",
    ],
  },
  swcMinify: true,
  env: {
    REALM_APP_ID: "application-0-hgucy",
    JWT_SECRET: "JWT_SECRET_STRINGS",
    BaseURI: "http://localhost:3001",
  },
};

module.exports = nextConfig;
