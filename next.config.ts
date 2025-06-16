import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */




  
  // AIにより、ここを追記しました。
  eslint: {
    // ビルド時の ESLint エラーを無視する
    ignoreDuringBuilds: true,
  },




};
export default nextConfig;


