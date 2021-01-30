import { useState, useEffect, useMemo, Dispatch, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { callEvent, getDistance, getPos, getRadian } from "../Libs/functions";
import {
  ActionType,
  PartsType,
  CustomEvent,
  MoveParams,
  WindowParams,
  WindowSymbol,
  WindowSymbolParam,
  BaseType,
} from "../Types/types";

export type WindowDispatch = Dispatch<ActionType>;

type Props = WindowParams & {
  ref: React.RefObject<HTMLElement>;
  titleSize: number;
  overlapped: boolean;
  baseX: BaseType;
  baseY: BaseType;
};

export const useWindow = (windowParams: Props | (() => Props)) => {
  const {
    ref,
    titleSize,
    active,
    x,
    y,
    baseX,
    baseY,
    width,
    height,
    overlapped,
    state,
  } = useMemo(
    () => (windowParams instanceof Function ? windowParams() : windowParams),
    []
  );
  const [params, setParams] = useState<MoveParams & { real: WindowParams }>(
    () => ({
      select: false,
      nodePoint: { x, y },
      nodeSize: { width, height },
      relativePoint: { x: 0, y: 0 },
      state,
      real: { active: false, x, y, width, height, state: "close" },
    })
  );

  useEffect(() => {
    addEventListener("mouseup", onMouseUp, false);
    addEventListener("touchend", onMouseUp, { passive: false });
    addEventListener("mousemove", onMouseMove, false);
    addEventListener("touchmove", onMouseMove, {
      passive: false,
    });
    addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    return () => {
      removeEventListener("mouseup", onMouseUp);
      removeEventListener("touchend", onMouseUp);
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("touchmove", onMouseMove);
      removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;
    switch (params.state) {
      case "max":
        if (params.real.state !== params.state)
          setParams({
            ...params,
            real: { ...params.real, state: params.state },
          });
        node.style.animation = "Max 0.5s ease 0s 1 forwards";
        break;
      case "min":
        node.style.animation = "MinRoot 0.3s ease 0s 1 forwards";
        (node.lastChild as HTMLElement).style.animation =
          "MinClient 0.3s ease 0s 1 alternate forwards";
        break;
      case "close":
        node.style.animation = "Hide 0.5s ease 0s forwards";
        break;
      case "normal":
        if (params.real.state !== params.state)
          setParams({
            ...params,
            real: { ...params.real, state: params.state },
          });
        if (params.real.state === "max")
          node.style.animation = "Restore 0.5s ease 0s forwards";
        else if (params.real.state === "min") {
          node.style.animation =
            "MinRestoreRoot 0.5s ease 0s 1 alternate forwards";
          (node.lastChild as HTMLElement).style.animation =
            "MinRestoreClient 0.1s ease 0s 1 alternate forwards";
        } else {
          node.style.animation = "Show 0.5s ease 0s none";
        }
        break;
    }
  }, [params.state]);
  useEffect(() => {
    const nodes = document.querySelectorAll(
      `[data-${WindowSymbol}="${WindowSymbolParam}"]`
    );
    new Set(
      Array.from(nodes)
        .map((node) => node.parentNode)
        .filter((node) => node) as HTMLElement[]
    ).forEach((node) => {
      Array.prototype.slice
        .call(node.childNodes, 0)
        .filter((node) => isWindow(node))
        .sort((a, b) => {
          if (a.style.position === b.style.position) {
            const az =
              (a.dataset.active === "true" ? 10000 : 0) +
              (a.style.zIndex ? parseInt(a.style.zIndex) : 0);
            const bz =
              (b.dataset.active === "true" ? 10000 : 0) +
              (b.style.zIndex ? parseInt(b.style.zIndex) : 0);
            return az - bz;
          } else {
            return a.style.position < b.style.position ? -1 : 1;
          }
        })
        .forEach((node, index) => {
          node.style.zIndex = index.toString();
        });
    });
  }, [params.real.active]);
  useEffect(() => {
    if (ref.current) {
      ref.current.dataset[WindowSymbol] = WindowSymbolParam;
      // if (params.state === "hide")
      //   dispatch({ type: "state", payload: "normal" });

      const onActive = (e: CustomEvent) => {
        const active = e.params === true;
        const node = ref.current!;
        node.dataset.active = active ? "true" : "false";
        setParams((p) => ({ ...p, real: { ...p.real, active } }));
      };
      const onAnimationEnd = () => {
        setParams((p) => {
          const node = ref.current!;
          if (!node) return { ...p, real: { ...p.real, state: p.state } };

          const parent = node.parentNode as HTMLElement;
          const { x, y, width, height } = getLimitWindow(parent, {
            ...p.real,
            x: p.nodePoint.x,
            y: p.nodePoint.y,
            width: p.nodeSize.width,
            height: p.nodeSize.height,
            state: p.state,
          });
          return {
            ...p,
            nodePoint: { x, y },
            nodeSize: { width, height },
            real: { ...p.real, x, y, width, height, state: p.state },
          };
        });
      };

      let timeHandle: ReturnType<typeof setTimeout> | null = null;
      const onParentSize = () => {
        if (!timeHandle)
          timeHandle = setTimeout(() => {
            setParams((params) => ({ ...params, real: { ...params.real } }));
            timeHandle = null;
          }, 1);
      };
      ref.current.addEventListener("active", onActive);
      ref.current.addEventListener("animationend", onAnimationEnd);
      const resizeObserver = new ResizeObserver(onParentSize);
      const parentNode = ref.current.parentNode as HTMLElement;
      parentNode && resizeObserver.observe(parentNode);
      active && setTimeout(() => foreground(ref.current!));

      return () => {
        resizeObserver.disconnect();
        ref.current?.removeEventListener("active", onActive);
        ref.current?.removeEventListener("animationend", onAnimationEnd);
      };
    }
  }, [ref.current]);
  /**
   *ウインドウをフォアグラウンドにする
   *
   * @memberof
   */
  const foreground = (node: HTMLElement) => {
    //Activeになるノードを取得
    const activeNodes = new Set<HTMLElement>();
    if (node) {
      let topNode = node;
      do {
        if (isWindow(node)) {
          activeNodes.add(node);
          topNode = node;
        }
      } while ((node = node.parentNode as HTMLElement));

      const parent = topNode.parentNode;
      if (parent) {
        const sendActive = (node: HTMLElement) => {
          if (isWindow(node)) {
            const act = activeNodes.has(node);
            callEvent(node, "active", act);
          }
          Array.prototype.forEach.call(node.childNodes, (node) => {
            sendActive(node);
          });
        };
        sendActive(parent as HTMLElement);
      }
    }
  };
  function isWindow(node: HTMLElement) {
    return node.dataset?.[WindowSymbol] === WindowSymbolParam;
  }
  const getLimitWindow = (parent: HTMLElement, real: WindowParams) => {
    const parentWidth = overlapped ? window.innerWidth : parent.clientWidth;
    const parentHeight = overlapped ? window.innerHeight : parent.clientHeight;

    const realHeight = real.state === "min" ? titleSize : real.height;
    const width = real.width > parentWidth ? parentWidth : real.width;
    const height = realHeight > parentHeight ? parentHeight : realHeight;
    const relativeX =
      baseX === "center"
        ? (parentWidth - width) / 2
        : baseX === "end"
        ? parentWidth - width
        : 0;
    const relativeY =
      baseY === "center"
        ? (parentHeight - height) / 2
        : baseY === "end"
        ? parentHeight - height
        : 0;
    let realX = Math.max(real.x + relativeX, 0);
    let realY = Math.max(real.y + relativeY, 0);
    if (realX + width > parentWidth) realX = parentWidth - width;
    if (realY + height > parentHeight) realY = parentHeight - height;
    return {
      x: realX - relativeX,
      y: realY - relativeY,
      realX,
      realY,
      width,
      height: real.state === "min" ? real.height : height,
    };
  };

  // マウスが離された場合に選択をリセット
  const onMouseUp = () => {
    setParams((p) => {
      if (!p.select) return p;
      const node = ref.current!;
      if (!node) {
        return {
          ...p,
          nodePoint: { x: p.real.x, y: p.real.y },
          nodeSize: { width: p.real.width, height: p.real.height },
          select: false,
        };
      }
      const parent = node.parentNode as HTMLElement;
      const { x, y, width, height } = getLimitWindow(parent, p.real);
      return {
        ...p,
        nodePoint: { x, y },
        nodeSize: { width, height },
        select: false,
      };
    });
  };
  const onTouchStart = () => {
    setParams((params) => ({ ...params, pinchiBaseDistance: undefined }));
  };

  // マウス移動時の処理
  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    setParams((params) => {
      if (!params.select) return params;
      if (params.real.state !== "max") {
        let { x, y } = params.nodePoint;
        let { width, height } = params.nodeSize;
        if ("touches" in e && e.touches.length === 2) {
          const baseDistance = params.distance ?? getDistance(e.touches);
          const distance = getDistance(e.touches) - baseDistance;
          const radian = getRadian(e.touches);
          const parentScale = 1;
          const deltaX =
            parentScale *
            Math.abs(Math.cos(radian!) * distance) *
            (distance < 0 ? -1 : 1);
          const deltaY =
            parentScale *
            Math.abs(-Math.sin(radian!) * distance) *
            (distance < 0 ? -1 : 1);
          x -= deltaX / 2;
          y -= deltaY / 2;
          width += deltaX;
          height += deltaY;
          e.preventDefault();
          return {
            ...params,
            distance: baseDistance,
            radian,
            real: {
              ...params.real,
              x,
              y,
              width,
              height,
            },
          };
        } else {
          const relativePoint = getPos(e); // 座標の取得
          const deltaX = relativePoint.x - params.basePoint.x;
          const deltaY = relativePoint.y - params.basePoint.y;
          const [moveX, moveX2] =
            baseX === "center"
              ? [deltaX / 2, deltaX / 2]
              : baseX === "end"
              ? [0, deltaX]
              : [deltaX, 0];
          const [moveY, moveY2] =
            baseY === "center"
              ? [deltaY / 2, deltaY / 2]
              : baseY === "end"
              ? [0, deltaY]
              : [deltaY, 0];

          params.nodeType.split("-").forEach((type) => {
            switch (type) {
              case "top":
                y += moveY;
                height -= deltaY;
                break;
              case "left":
                x += moveX;
                width -= deltaX;
                break;
              case "right":
                x += moveX2;
                width += deltaX;
                break;
              case "bottom":
                y += moveY2;
                height += deltaY;
                break;
              case "title":
                x += deltaX;
                y += deltaY;
                break;
              default:
                return params;
            }
          });
          e.preventDefault();
          return {
            ...params,
            relativePoint,
            real: {
              ...params.real,
              x,
              y,
              width,
              height,
            },
          };
        }
      }
      return params;
    });
  };
  const handleWindow = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    foreground(e.target as HTMLElement);
    setParams((params) => {
      if (params.select) return params;
      const node = e.target as HTMLElement;
      const pos = getPos(e.nativeEvent);
      return {
        ...params,
        select: true,
        basePoint: pos,
        relativePoint: pos,
        nodeType: (node.dataset["place"] as PartsType) || "",
      };
    });
  };
  const dispatch: Dispatch<ActionType> = (action) => {
    switch (action.type) {
      case "state":
        setParams((params) => ({
          ...params,
          state: action.payload,
        }));
        break;
      case "position":
        setParams((params) => ({
          ...params,
          real: { ...params.real, ...action.payload },
        }));
        break;
      case "size":
        setParams((params) => ({
          ...params,
          real: { ...params.real, ...action.payload },
        }));
        break;
    }
  };
  const refState = useRef<{
    params: WindowParams;
    dispatch: typeof dispatch;
    handleWindow: typeof handleWindow;
  }>();
  const retValue = useMemo(() => {
    const { real } = params;
    const node = ref.current;
    let newReal = real;
    if (node) {
      const parent = node.parentNode as HTMLElement;
      const [parentWidth, parentHeight] = overlapped
        ? [window.innerWidth, window.innerHeight]
        : [parent.clientWidth, parent.clientHeight];
      if (real.state === "max") {
        newReal = {
          ...real,
          x: 0,
          y: 0,
          width: parentWidth,
          height: parentHeight,
        };
      } else {
        const { realX: x, realY: y, width, height } = getLimitWindow(
          parent,
          real
        );
        newReal = { ...real, x, y, width, height };
      }
    }

    if (
      refState.current &&
      (Object.keys(newReal) as (keyof WindowParams)[]).reduce(
        (a, b) => a && newReal[b] === refState.current!.params[b],
        true
      )
    )
      return refState.current;

    refState.current = { params: newReal, handleWindow, dispatch };
    return refState.current;
  }, [params.real]);
  return retValue;
};
