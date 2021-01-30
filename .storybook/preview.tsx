import "@storybook/addon-console";
import React from "react";
import { withScreenshot } from "storycap";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs/blocks";
import { Parameters } from "@storybook/react";
export const decorators = [withScreenshot];

const viewport = {
  viewports: {
    PC: {
      name: "PC",
      styles: {
        width: "1024px",
        height: "768px",
      },
    },
    SP: {
      name: "SP",
      styles: {
        width: "375px",
        height: "812px",
      },
    },
  },
  defaultViewport: "PC",
};
export const parameters: Parameters = {
  viewport,
  screenshot: {
    viewports: {
      PC: {
        width: 1024,
        height: 768,
      },
      SP: {
        width: 375,
        height: 668,
      },
    },
  },
  viewMode: "canvas",
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};
