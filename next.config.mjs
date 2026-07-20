/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Only PUBLIC values reach the browser bundle. The PREVIEW token
  // (STORYBLOK_DELIVERY_API_TOKEN) is deliberately NOT listed here — it stays
  // server-only so drafts can't be read from the public JS.
  env: {
    STORYBLOK_PUBLIC_TOKEN: process.env.STORYBLOK_PUBLIC_TOKEN,
    STORYBLOK_API_BASE_URL: process.env.STORYBLOK_API_BASE_URL,
    STORYBLOK_REGION: process.env.STORYBLOK_REGION,
  },
};

export default nextConfig;
