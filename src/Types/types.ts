export type WindowState = "normal" | "max" | "min" | "close";
export type PartsType =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "left-top"
  | "right-top"
  | "right-bottom"
  | "left-bottom"
  | "title"
  | "client";

/**
 *位置設定用
 *
 * @export
 * @interface Point
 */
export interface Point {
  x: number;
  y: number;
}
/**
 * サイズ設定用
 */
export interface Size {
  width: number;
  height: number;
}
/**
 * ドラッグドロップ機能用
 *
 * @export
 * @interface MoveParams
 * @param {Point} basePoint     クリック基準位置
 * @param {Point} relativePoint 移動相対位置
 * @param {Point} nodePoint     ノード初期位置
 * @param {Size}  nodeSize       ノード初期サイズ
 * @param {Size}  distance       ピッチ距離
 * @param {Size}  radian         ピッチ方向
 */
export type MoveParams =
  | {
      select: true;
      basePoint: Point;
      relativePoint: Point;
      nodeType: PartsType;
      nodePoint: Point;
      nodeSize: Size;
      distance?: number;
      radian?: number;
      state: WindowState;
    }
  | {
      select: false;
      nodePoint: Point;
      nodeSize: Size;
      state: WindowState;
    };
export interface CustomEvent extends Event {
  params?: unknown;
}

export type WindowParams = {
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  state: WindowState;
};

export type ActionType =
  | {
      type: "state";
      payload: WindowState;
    }
  | {
      type: "position";
      payload: { x?: number; y?: number };
    }
  | { type: "size"; payload: { width?: number; height?: number } };
export type BaseType = "start" | "end" | "center";
export const WindowSymbol = "__symbol";
export const WindowSymbolParam = "Window";
