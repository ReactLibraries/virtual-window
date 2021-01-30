import React, { FC } from "react";
import { WindowState } from "../../Types/types";
import { Root } from "./Client.styled";

type Props = {
  onMouse?: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
  state?: WindowState;
  movable?: boolean;
  frameSize?: number;
};

/**
 * Client
 *
 * @param {Props} { }
 */
export const Client: FC<Props> = ({
  state,
  className,
  style,
  movable,
  onMouse,
  frameSize = 1,
  children,
}) => {
  return (
    <Root
      data-place={movable ? "title" : "client"}
      data-state={state}
      style={style}
      frameSize={frameSize}
      className={className}
      onMouseDown={onMouse}
      onTouchStart={onMouse}
    >
      {children}
    </Root>
  );
};
