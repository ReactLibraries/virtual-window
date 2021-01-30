import * as path from "path";
import { Configuration } from "webpack";
import { createTransformer } from "typescript-plugin-styled-components";
const svgToTinyDataUri = require("mini-svg-data-uri");

const config: Configuration = {
  mode: "production",
  //mode: "development",
  entry: path.resolve(__dirname, "index.ts"),
  output: {
    libraryTarget: "commonjs",
    filename: "index.js",
    path: path.resolve(__dirname, "..", "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [createTransformer({ minify: true, ssr: true })],
              }),
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: "asset/inline",
        generator: {
          dataUrl: (content: Buffer) => {
            return svgToTinyDataUri(content.toString());
          },
        },
        use: [{ loader: "svgo-loader" }],
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: [".ts", ".tsx", ".js", ".scss", "css", ".svg"],
  },
  externals: {
    react: true,
    "styled-components": true,
    "resize-observer-polyfill": true,
  },
  devtool: "source-map",
};

module.exports = config;
