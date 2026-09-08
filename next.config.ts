import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * "Find Your Fit" became "Your Pitch" and moved to /pitch. Anything
   * already linking to the old path keeps working.
   */
  async redirects() {
    return [{ source: "/quiz", destination: "/pitch", permanent: true }];
  },
};

export default nextConfig;
