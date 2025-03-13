/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["source.unsplash.com"], // Allow external images
    },
  };
  
  module.exports = nextConfig;