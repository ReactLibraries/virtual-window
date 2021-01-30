import React, { Dispatch, useRef, useState } from "react";
import { VirtualWindow } from ".";
import { Decorator } from "../../Storybook";
import { ActionType, WindowParams } from "../../Types/types";

export default {
  title: "Components/VirtualWindow",
  decorators: [Decorator],
  component: VirtualWindow,
};

export const Primary = (args: Parameters<typeof VirtualWindow>[0]) => {
  return (
    <>
      <div style={{ position: "relative", height: "730px" }}>
        <VirtualWindow {...args}>Contents</VirtualWindow>
      </div>
    </>
  );
};
Primary.args = { title: "Title", overlapped: false };
Primary.parameters = {
  viewMode: "docs",
};
export const ParentAndChild = () => (
  <>
    <VirtualWindow title="Top Window1" x={10} y={10}>
      contents
      <VirtualWindow
        title="Child Window(Client)"
        width={400}
        height={200}
        overlapped={false}
      >
        Inside only
      </VirtualWindow>
      <VirtualWindow
        title="Child Window(Overlap)"
        x={160}
        y={250}
        width={400}
        height={200}
        active={true}
      >
        Can go outside
      </VirtualWindow>
    </VirtualWindow>
    <VirtualWindow title="TopWindow2" x={350} y={350} width={300} height={200}>
      contents
    </VirtualWindow>
  </>
);

export const UpdateParams = () => {
  const [params, setParams] = useState<WindowParams>();
  return (
    <>
      <VirtualWindow title="Update parameters" onUpdate={setParams}>
        <pre>{JSON.stringify(params, null, "  ")}</pre>
      </VirtualWindow>
    </>
  );
};

export const dispatch = () => {
  const dispatch = useRef<Dispatch<ActionType>>(null);
  const [params, setParams] = useState<WindowParams>();
  return (
    <>
      <VirtualWindow
        x={100}
        y={100}
        title="Event test"
        dispatch={dispatch}
        onUpdate={setParams}
      ></VirtualWindow>
      <button
        onClick={() =>
          dispatch.current?.({
            type: "state",
            payload: params?.state === "close" ? "normal" : "close",
          })
        }
      >
        {params?.state === "close" ? "Open" : "Close"}
      </button>
      <button
        onClick={() =>
          dispatch.current?.({
            type: "position",
            payload: { x: params.x + 50 },
          })
        }
      >
        →
      </button>
      <pre>{JSON.stringify(params, null, "  ")}</pre>
    </>
  );
};

export const Frame = () => (
  <>
    <VirtualWindow
      frameSize={3}
      title="Frame size 3"
      resize={false}
      x={400}
      y={60}
      width={300}
      height={300}
    />
    <VirtualWindow
      title="No resizing"
      resize={false}
      x={50}
      y={60}
      width={300}
      height={300}
    />
    <VirtualWindow
      title={null}
      clientMovable={true}
      x={150}
      y={160}
      width={300}
      height={300}
    >
      Move with untitled client
    </VirtualWindow>
  </>
);

export const Position = () => (
  <VirtualWindow baseX="center" baseY="center" title="親(Center)">
    <VirtualWindow
      overlapped={false}
      baseX="center"
      baseY="center"
      width={300}
      height={300}
      title="Child(Center)"
    ></VirtualWindow>
    <VirtualWindow
      overlapped={false}
      baseX="end"
      baseY="end"
      width={300}
      height={300}
      title="Child(Right-Bottom)"
    ></VirtualWindow>
    <VirtualWindow
      overlapped={false}
      baseX="start"
      baseY="start"
      width={300}
      height={300}
      title="Child(Left-Top)"
    ></VirtualWindow>
  </VirtualWindow>
);

export const TitleButton = () => (
  <>
    <VirtualWindow
      title="No minimize icon"
      titleButtons={{ min: false }}
      height={120}
    />
    <VirtualWindow
      title="No maximize icon"
      titleButtons={{ max: false }}
      height={120}
      y={130}
    />
    <VirtualWindow
      title="No Close icon"
      titleButtons={{ close: false }}
      height={120}
      y={270}
    />
  </>
);
