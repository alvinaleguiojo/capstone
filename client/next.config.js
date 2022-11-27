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
    PDF_API_TemaplateID: "21BB6F25-D058-41F0-9E3D-45DBD3370F0E",
    PDF_API_SECRET: "xFwQzxUA6VF2EsUZk_29",
    MY_SECRET_TOKEN:"supersecret",
    Revalidate_Path: "http://localhost:3000/api/revalidate?path=",
    Geocode_URL:"https://maps.googleapis.com/maps/api/geocode/json",
    Geocode_key:"AIzaSyARVsHTSNRkh4ycHSqj6F3Ig7yIsALSaIQ",
    SYNCFUSION_KEY:"ORg4AjUWIQA/Gnt2VVhjQlFac1dJXGFWfFZpR2NbfU5xdF9HaVZSTWYuP1ZhSXxRd0RhXH5ecnVQRGVcUkc="
  },
};

module.exports = nextConfig;
