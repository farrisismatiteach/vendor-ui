/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  styledComponents: {
    ssr: true,
    displayName: true,
  }
}

module.exports = nextConfig
