/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "drive.google.com",
          port: "",
          pathname: "/uc*", // Matches "https://drive.google.com/uc?id="
        },
      ],
    },
  };
  
  export default nextConfig;
  