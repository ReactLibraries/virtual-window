import styled from "styled-components";

type Props = {
  titleSize: number;
  frameSize: number;
};
export const Root = styled.div<Props>`
  display: flex;
  user-select: none;
  cursor: move;
  overflow: hidden;
  border-left: ${(p) => p.frameSize}px solid black;
  border-right: ${(p) => p.frameSize}px solid black;
  border-top: ${(p) => p.frameSize}px solid black;
  box-sizing: border-box;
  left: -1px;
  top: -1px;
  right: -1px;
  height: ${(p) => p.titleSize}px;

  border-radius: 0.8em 0.8em 0 0;
  &.max {
    border: none;
  }

  background-color: rgba(100, 150, 255, 0.9);
  color: white;

  &.active {
    background-color: rgba(50, 100, 255, 0.9);
    color: #eeeeee;
  }

  > .text {
    display: flex;
    flex: 1;
    overflow: hidden;
    align-items: center;
    pointer-events: none;
    text-overflow: ellipsis;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: 24px;
    padding: 0px 0.5em;
    white-space: nowrap;
  }
`;
