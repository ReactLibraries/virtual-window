import styled from "styled-components";

export const Root = styled.div<{ size: number; frameSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  &:active div {
    background-color: rgba(0, 0, 0, 0.08);
  }

  div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.001);
    pointer-events: all;
  }
  .top {
    cursor: n-resize;
    left: ${(p) => p.frameSize}px;
    top: -${(p) => p.size - p.frameSize}px;
    right: ${(p) => p.frameSize}px;
    height: ${(p) => p.size}px;
  }
  .right {
    cursor: e-resize;
    top: ${(p) => p.frameSize}px;
    right: -${(p) => p.size - p.frameSize}px;
    bottom: ${(p) => p.frameSize}px;
    width: ${(p) => p.size}px;
  }
  .bottom {
    cursor: s-resize;
    left: ${(p) => p.frameSize}px;
    right: ${(p) => p.frameSize}px;
    height: ${(p) => p.size}px;
    bottom: -${(p) => p.size - p.frameSize}px;
  }
  .left {
    cursor: w-resize;
    top: ${(p) => p.frameSize}px;
    left: -${(p) => p.size - p.frameSize}px;
    bottom: ${(p) => p.frameSize}px;
    width: ${(p) => p.size}px;
  }
  .left-top {
    cursor: nw-resize;
    left: -${(p) => p.size - p.frameSize}px;
    top: -${(p) => p.size - p.frameSize}px;
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    border-top-left-radius: 100%;
  }
  .right-top {
    cursor: ne-resize;
    right: -${(p) => p.size - p.frameSize}px;
    top: -${(p) => p.size - p.frameSize}px;
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    border-top-right-radius: 100%;
  }
  .left-bottom {
    cursor: sw-resize;
    left: -${(p) => p.size - p.frameSize}px;
    bottom: -${(p) => p.size - p.frameSize}px;
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    border-bottom-left-radius: 100%;
  }
  .right-bottom {
    cursor: se-resize;
    right: -${(p) => p.size - p.frameSize}px;
    bottom: -${(p) => p.size - p.frameSize}px;
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    border-bottom-right-radius: 100%;
  }
`;
