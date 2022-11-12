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
      "localhost",
      "t4.ftcdn.net",
    ],
  },
  swcMinify: true,
  env: {
    REALM_APP_ID: "application-0-hgucy",
    JWT_SECRET: "JWT_SECRET_STRINGS",
    BaseURI: "http://localhost:3001",
    PDF_API_URL: "https://api.pdfmonkey.io/api/v1",
    PDF_API_TemaplateID: "02792BF0-EA57-4C92-9537-1687D75AEDEF",
    PDF_API_SECRET: "UGY1PBXDMZ_u_jbMrGEh",
  },
};

module.exports = nextConfig;
