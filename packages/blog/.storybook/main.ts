import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

// .storybook/main.js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");
    config.resolve.plugins?.push(new TsconfigPathsPlugin());
    return config;
  },
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      image: {
        loading: "eager",
      },
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
