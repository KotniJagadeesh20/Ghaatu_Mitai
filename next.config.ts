import type { NextConfig } from "next";

const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPagesBuild ? "/Ghaatu_Mitai" : "",
  trailingSlash: isGithubPagesBuild,
};

export default nextConfig;
