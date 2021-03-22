import React from "react";
import { TitleBar } from ".";
import { Decorator } from "../../Storybook";

export default {
  title: "Components/TitleBar",
  decorators: [Decorator],
  component: TitleBar,
};

export const Primary = (args: Parameters<typeof TitleBar>[0]) => (
  <>
    <TitleBar {...args}>Title</TitleBar>
  </>
);
Primary.parameters = {
  viewMode: "docs",
};
export const Active = () => (
  <>
    <TitleBar titleSize={32} active>
      TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
    </TitleBar>
    <TitleBar titleSize={32} active>
      Normal time
    </TitleBar>
    <TitleBar titleSize={32} active state="max">
      Maximize
    </TitleBar>
    <TitleBar titleSize={32} active state="min">
      Minimize
    </TitleBar>
  </>
);

export const Normal64 = () => (
  <>
    <TitleBar titleSize={64}>
      TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
    </TitleBar>
    <TitleBar titleSize={64}>通常時</TitleBar>
    <TitleBar titleSize={64} state="max">
      Maximize
    </TitleBar>
    <TitleBar titleSize={64} state="min">
      Minimize
    </TitleBar>
  </>
);

export const Buttons = () => (
  <>
    <TitleBar buttons={{ min: false }}>No minimize icon</TitleBar>
    <TitleBar buttons={{ max: false }}>No maximize icon</TitleBar>
    <TitleBar buttons={{ close: false }}>No Close icon</TitleBar>
  </>
);
