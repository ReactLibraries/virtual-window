import type { StorybookConfig } from "@storybook/core/types";

module.exports = {
  stories: ["../src/**/*.stories.@(tsx)"],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-viewport",
    "storycap",
  ],
} as StorybookConfig;
