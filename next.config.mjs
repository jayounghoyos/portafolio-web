/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // The chassis GLB is content-addressed by redeploy, not by URL — but it
        // changes rarely and is 0.6 MB; cache hard, bust by renaming if needed.
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
