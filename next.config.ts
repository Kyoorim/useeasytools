import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const projectRoot = "/Users/kyoorim/Desktop/useeasytools";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default withNextIntl(nextConfig);
