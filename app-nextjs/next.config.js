/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quiz.kegel-plan.com',
      },
    ],
  },
}

module.exports = nextConfig
