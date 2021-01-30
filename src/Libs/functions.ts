export const getPos = (e: MouseEvent | TouchEvent) => {
  if ("targetTouches" in e) {
    const { pageX: x, pageY: y } = e.targetTouches[0];
    return { x, y };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
};

export const getDistance = (p: TouchList) => {
  const x = p[0].pageX - p[1].pageX;
  const y = p[0].pageY - p[1].pageY;
  return Math.sqrt(x * x + y * y);
};
export const getRadian = (p: TouchList) => {
  const x = p[0].pageX - p[1].pageX;
  const y = p[0].pageY - p[1].pageY;
  return Math.atan2(y, x);
};
/**
 * ノードに対してイベントを発生させる
 *
 * @static
 * @param {HTMLElement} node 対象ノード
 * @param {string} ename イベント名
 * @param {*} [params] イベント発生時にevent.paramsの形で送られる
 * @memberof WindowManager
 */
export const callEvent = (
  node: HTMLElement,
  ename: string,
  params?: unknown
) => {
  node.dispatchEvent(createEvent(ename, params));
};
/**
 *イベントを作成する
 *
 * @static
 * @param {string} ename イベント名
 * @param {*} [params] イベント発生時にevent.paramsの形で送られる
 * @returns {Event} 作成したイベント
 * @memberof WindowManager
 */

export const createEvent = (ename: string, params?: unknown): Event => {
  let event: CustomEvent & { params?: unknown };
  try {
    event = new CustomEvent(ename);
  } catch (e) {
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(ename, false, false, null);
  }
  if (params) {
    event.params = params;
  }
  return event;
};
