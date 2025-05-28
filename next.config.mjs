/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dd1i5d0iq/**', 
         search: '',
      },
    ],
  },
};

export default nextConfig;
