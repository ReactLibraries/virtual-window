import React from "react";
import styled from "styled-components";
import { ResizeFrame } from ".";
import { Decorator } from "../../Storybook";

export default {
  title: "Components/ResizeFrame",
  decorators: [Decorator],
  component: ResizeFrame,
  parameters: {
    viewMode: "canvas",
  },
};

const Box = styled.div`
  position: relative;
  margin: 32px;
  width: 100px;
  height: 100px;
  background: greenyellow;
  box-sizing: border-box;
`;

export const Primary = (args: Parameters<typeof ResizeFrame>[0]) => (
  <>
    <Box>
      <ResizeFrame {...args} resizeBold={8} />
    </Box>
  </>
);
Primary.parameters = {
  viewMode: "docs",
};
