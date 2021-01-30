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
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </TitleBar>
    <TitleBar titleSize={32} active>
      通常時
    </TitleBar>
    <TitleBar titleSize={32} active state="max">
      最大化
    </TitleBar>
    <TitleBar titleSize={32} active state="min">
      最小化
    </TitleBar>
  </>
);

export const Normal64 = () => (
  <>
    <TitleBar titleSize={64}>
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </TitleBar>
    <TitleBar titleSize={64}>通常時</TitleBar>
    <TitleBar titleSize={64} state="max">
      最大化
    </TitleBar>
    <TitleBar titleSize={64} state="min">
      最小化
    </TitleBar>
  </>
);

export const Buttons = () => (
  <>
    <TitleBar buttons={{ min: false }}>最小化アイコン無し</TitleBar>
    <TitleBar buttons={{ max: false }}>最大化アイコン無し</TitleBar>
    <TitleBar buttons={{ close: false }}>Closeアイコン無し</TitleBar>
  </>
);
