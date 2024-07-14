/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpack(config) {
        return config;
    },
    experimental: {
        appDir: true,
    },
};

export default nextConfig;
