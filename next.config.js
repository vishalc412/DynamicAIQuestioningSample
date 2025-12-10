/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Set base path for GitHub Pages (repository name)
  // Change 'DynamicAIQuestioningSample' to your actual repo name if different
  basePath: process.env.NODE_ENV === 'production' ? '/DynamicAIQuestioningSample' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/DynamicAIQuestioningSample/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with GitHub Pages routing
}

module.exports = nextConfig
