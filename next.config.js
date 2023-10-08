/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_CUSTOM_URL: process.env.POSTGRES_PRISMA_CUSTOM_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_PRISMA_CUSTOM_URL: process.env.MONGODB_PRISMA_CUSTOM_URL,
  },
};

module.exports = nextConfig;
