import type { NextConfig } from "next";

const nextConfig: NextConfig = {}

export const config = {
  matcher: [
    '/admin/dashboard',
    '/owner/dashboard',
    '/tenant/dashboard',
  ],
}

export default nextConfig;
