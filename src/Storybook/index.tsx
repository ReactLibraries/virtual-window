import React from "react";

export const Viewport = (name: string) => ({
  viewport: {
    defaultViewport: name,
  },
});

export const Decorator = (story: React.FunctionComponent) => story({});
