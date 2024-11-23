

/** @type {import("next").NextConfig} */
const config = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "nxtblog.ai",
                pathname: "/api/cdn/**"
            }
        ]
    }
};

export default config;
