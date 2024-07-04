/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image 컴포넌트에서 다른 origin 에서 가져올 때 필요한 설정인 것 같음
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
    ],
  },
};

export default nextConfig;
