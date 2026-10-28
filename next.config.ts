import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт: `npm run build` кладёт готовый сайт в out/ (подходит для GitHub Pages)
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // cacheComponents и partialPrefetching из шаблона не работают со статическим экспортом
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
