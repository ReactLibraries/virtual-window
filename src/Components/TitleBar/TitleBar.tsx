import React, { FC } from "react";
import { WindowDispatch } from "../../Hooks/useWindow";
import { WindowState } from "../../Types/types";
import { Icon, Icons } from "../Icon";
import { Root } from "./TitleBar.styled";

type Props = {
  /**
   * Active Style
   *
   * @type boolean
   */
  active?: boolean;
  titleSize?: number;
  state?: WindowState;
  frameSize?: number;
  buttons?: { [key in "min" | "max" | "close"]?: boolean };
  dispatch?: WindowDispatch;
  onMouse?: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => void;
};

/**
 *TitleBar
 *
 * @param {Props} {
 *   active=false,
 *   children,
 *   state,
 *   frameSize = 1,
 *   buttons,
 *   onMouse,
 *   dispatch,
 *   titleSize = 32,
 * }
 * @return {*}
 */
export const TitleBar: FC<Props> = ({
  active = false,
  children,
  state,
  frameSize = 1,
  buttons,
  onMouse,
  dispatch,
  titleSize = 32,
}) => {
  return (
    <Root
      titleSize={titleSize}
      frameSize={Math.max(1, frameSize)}
      data-place="title"
      className={[active && "active", state].join(" ")}
      onMouseDown={onMouse}
      onTouchStart={onMouse}
    >
      <div className="text">{children}</div>
      {buttons?.min !== false && state !== "min" && (
        <Icon
          type="button"
          src={Icons.Min}
          onClick={() => dispatch?.({ type: "state", payload: "min" })}
        />
      )}
      {state && state !== "normal" && (
        <Icon
          type="button"
          src={Icons.Normal}
          onClick={() => dispatch?.({ type: "state", payload: "normal" })}
        />
      )}
      {buttons?.max !== false && state !== "max" && (
        <Icon
          type="button"
          src={Icons.Max}
          onClick={() => dispatch?.({ type: "state", payload: "max" })}
        />
      )}
      {buttons?.close !== false && (
        <Icon
          type="button"
          src={Icons.Close}
          onClick={() => dispatch?.({ type: "state", payload: "close" })}
        />
      )}
    </Root>
  );
};
