/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      // Define the base URL for your backend API
      API_BASE_URL: "http://localhost:5000/api",
    },
    // Enable React strict mode for better error detection
    reactStrictMode: true,
  };
  
  module.exports = nextConfig;
  