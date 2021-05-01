module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.@(tsx)"],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-viewport",
    "storycap",
  ],
};
