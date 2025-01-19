/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com", // Allow images from Cloudinary
          port: "",
          pathname: "/**", // Allow all paths
        },
        {
          protocol: "https",
          hostname: "drive.google.com", // Allow images from Google Drive
          port: "",
          pathname: "/**", // Matches "https://drive.google.com/uc?id="
        },
      ],
    },
  };
  
  export default nextConfig;  
  