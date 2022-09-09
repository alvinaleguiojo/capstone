/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://t3.ftcdn.net']
  },
  swcMinify: true,
  env:{
    REALM_APP_ID : 'application-0-hgucy'
  }
}

module.exports = nextConfig
