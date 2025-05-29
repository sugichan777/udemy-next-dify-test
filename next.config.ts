import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */




  
  // ここを追記
  eslint: {
    // ビルド時の ESLint エラーを無視する
    ignoreDuringBuilds: true,
  },




};
export default nextConfig;


