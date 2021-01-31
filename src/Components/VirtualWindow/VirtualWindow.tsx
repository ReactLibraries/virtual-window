import React, {
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { ResizeFrame } from "../ResizeFrame";
import { Client } from "../Client";
import { TitleBar } from "../TitleBar";
import { Root } from "./VirtualWindow.styled";
import {
  ActionType,
  BaseType,
  WindowParams,
  WindowState,
} from "../../Types/types";
import { useWindow } from "../../Hooks/useWindow";

/**
 *
 *
 * @interface Props
 */
interface Props {
  /**
   * Window title
   *
   * @type {ReactNode}
   * @memberof Props
   */
  title?: ReactNode;
  /**
   * Whether to display the title
   *
   * @type {boolean}
   * @memberof Props
   */
  titleEnable?: boolean;
  /**
   * Title bar size
   *
   * @type {number}
   * @memberof Props
   */
  titleSize?: number;
  /**
   * Presence or absence of a button attached to the title
   *
   * @type {({ [key in "min" | "max" | "close"]?: boolean })}
   * @memberof Props
   */
  titleButtons?: { [key in "min" | "max" | "close"]?: boolean };
  /**
   * Whether to activate in the initial state
   *
   * @type {boolean}
   * @memberof Props
   */
  active?: boolean;
  /**
   * Whether to set position to fixed
   *
   * @type {boolean}
   * @memberof Props
   */
  overlapped?: boolean;
  /**
   * Placement criteria in the X direction
   *
   * @type {BaseType}
   * @memberof Props
   */
  baseX?: BaseType;
  /**
   * Placement criteria in the Y direction
   *
   * @type {BaseType}
   * @memberof Props
   */
  baseY?: BaseType;
  /**
   * Initial X position
   *
   * @type {number}
   * @memberof Props
   */
  x?: number;
  /**
   * Initial Y position
   *
   * @type {number}
   * @memberof Props
   */
  y?: number;
  /**
   * Initial width
   *
   * @type {number}
   * @memberof Props
   */
  width?: number;
  /**
   * Initial height
   *
   * @type {number}
   * @memberof Props
   */
  height?: number;
  /**
   * Window state
   *
   * @type {WindowState}
   * @memberof Props
   */
  state?: WindowState;
  /**
   * Frame size
   *
   * @type {number}
   * @memberof Props
   */
  frameSize?: number;
  /**
   * Whether to allow resizing
   *
   * @type {boolean}
   * @memberof Props
   */
  resize?: boolean;
  /**
   * Invisible frame size for resizing
   *
   * @type {number}
   * @memberof Props
   */
  resizeBold?: number;
  /**
   * Client style
   *
   * @type {React.CSSProperties}
   * @memberof Props
   */
  clientStyle?: React.CSSProperties;
  /**
   * Client class name
   *
   * @type {string}
   * @memberof Props
   */
  clientClass?: string;
  /**
   * Whether the client can be dragged and dropped
   *
   * @type {boolean}
   * @memberof Props
   */
  clientMovable?: boolean;
  /**
   * Dispatch for parameter setting
   *
   * @type {(MutableRefObject<Dispatch<ActionType> | null>)}
   * @memberof Props
   */
  dispatch?: MutableRefObject<Dispatch<ActionType> | null>;
  /**
   * State change event
   *
   * @memberof Props
   */
  onUpdate?: (params: WindowParams) => void;
}

/**
 *
 *
 * @param {*} {
 *   title = "",
 *   titleSize = 32,
 *   titleEnable = true,
 *   titleButtons,
 *   active = false,
 *   overlapped = true,
 *   x = 0,
 *   y = 0,
 *   baseY = "start",
 *   baseX = "start",
 *   width = 640,
 *   height = 480,
 *   state = "normal",
 *   frameSize = 1,
 *   resize = true,
 *   resizeBold = 8,
 *   clientStyle,
 *   clientClass,
 *   clientMovable = false,
 *   children,
 *   dispatch: refDispatch,
 *   onUpdate,
 * }
 * @return {*}
 */
export const VirtualWindow: FC<Props> = ({
  title = "",
  titleSize = 32,
  titleEnable = true,
  titleButtons,
  active = false,
  overlapped = true,
  x = 0,
  y = 0,
  baseY = "start",
  baseX = "start",
  width = 640,
  height = 480,
  state = "normal",
  frameSize = 1,
  resize = true,
  resizeBold = 8,
  clientStyle,
  clientClass,
  clientMovable = false,
  children,
  dispatch: refDispatch,
  onUpdate,
}) => {
  const refWindow = useRef<HTMLDivElement>(null);
  const { params, handleWindow, dispatch } = useWindow(() => ({
    ref: refWindow,
    active,
    overlapped,
    baseX,
    baseY,
    x,
    y,
    titleSize,
    width,
    height,
    state,
    init: false,
  }));
  useEffect(() => {
    if (refDispatch) refDispatch.current = dispatch;
  }, [refDispatch]);
  useEffect(() => {
    onUpdate?.(params);
  }, [params]);
  return (
    <Root
      ref={refWindow}
      onMouseDown={handleWindow}
      titleSize={titleSize}
      style={{
        left: `${params.x}px`,
        top: `${params.y}px`,
        width: `${params.width}px`,
        height: `${params.height}px`,
        position: overlapped ? "fixed" : "absolute",
        visibility: params.init ? "visible" : "hidden",
      }}
    >
      {titleEnable && (
        <TitleBar
          titleSize={titleSize}
          frameSize={frameSize}
          buttons={titleButtons}
          active={params.active}
          state={params.state}
          onMouse={handleWindow}
          dispatch={dispatch}
        >
          {title}
        </TitleBar>
      )}
      <Client
        className={clientClass}
        style={clientStyle}
        frameSize={frameSize}
        onMouse={handleWindow}
        state={params.state}
        movable={clientMovable}
      >
        {children}
      </Client>
      {resize && (
        <ResizeFrame
          frameSize={frameSize}
          resizeBold={resizeBold}
          onMouse={handleWindow}
        />
      )}
    </Root>
  );
};
