/** @type {import('next').NextConfig} */
const nextConfig = {
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/api/case_studies/[slug]': { page: '/api/case_studies/[slug]' },
    };
  },
};

export default nextConfig;
