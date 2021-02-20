import React, { FC } from "react";
import { Root } from "./Icon.styled";

import Close from "../../Images/close.svg";
import Max from "../../Images/max.svg";
import Min from "../../Images/min.svg";
import Normal from "../../Images/normal.svg";

type IconType = "normal" | "button";

type Props = {
  /**
   * Icon URL
   *
   * @type {string}
   */
  src: string;
  /**
   *normal: Normal icon
   *button: Button icon
   *
   * @type {IconType}
   */
  type?: IconType;
  /**
   *クリックイベント
   *
   */
  onClick?: () => void;
};

/**
 * For icon display
 *
 * @param {*} { src, type = "normal", onClick }
 */
export const Icon: FC<Props> = ({ src, type = "normal", onClick }) => (
  <Root
    className={type}
    src={src}
    onClick={(e) => {
      onClick?.();
      e.stopPropagation();
    }}
  />
);
export const Icons = { Close, Max, Min, Normal };
