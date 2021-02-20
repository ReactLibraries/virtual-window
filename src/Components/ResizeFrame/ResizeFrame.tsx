import React, { FC } from "react";
import { PartsType } from "../../Types/types";
import { Root } from "./ResizeFrame.styled";

export const Borders: PartsType[] = [
  "top",
  "right",
  "bottom",
  "left",
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom",
];

/**
 *
 *
 * @interface Props
 */
interface Props {
  /**
   * Resize frame thickness
   *
   * @type {number}
   * @memberof Props
   */
  resizeBold?: number;
  /**
   * Target display frame size
   *
   * @type {number}
   * @memberof Props
   */
  frameSize?: number;
  onMouse?: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => void;
}

/**
 * Border
 *
 * @param {Props} { }
 */
export const ResizeFrame: FC<Props> = ({
  resizeBold = 8,
  frameSize = 1,
  onMouse,
}) => {
  return (
    <>
      <Root size={resizeBold} frameSize={frameSize}>
        {Borders.map((border) => (
          <div
            key={border}
            data-place={border}
            className={border}
            onMouseDown={onMouse}
            onTouchStart={onMouse}
          />
        ))}
      </Root>
    </>
  );
};
