/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", // 백엔드 서버로 프록시
      },
    ];
  },
};

export default nextConfig;
