import { find, maxBy, isEmpty } from "lodash";

import {
  ACTIVE_MAP_NODE_ADD,
  NEW_NODE_TITLE,
  ACTIVE_MAP_NODE_ACTIVE,
  ACTIVE_MAP_NODE_CHANGE,
  ACTIVE_MAP_NODE_REMOVE,
  ACTIVE_MAP_CHANGE,
  ACTIVE_MAP_UNDO,
  ACTIVE_MAP_REDO
} from "./constants";

/* DEFAULT */

export const defaultNodeChangeColor = (
  defaultNodeColor,
  defaultNodeBorderColor,
  defaultNodeTitleColor
) => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    defaultNodeColor,
    defaultNodeBorderColor,
    defaultNodeTitleColor
  }
});

export const defaultNodeChangeFont = (
  defaultNodeFont,
  defaultNodeFontSize
) => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    defaultNodeFont,
    defaultNodeFontSize
  }
});

export const defaultNodeChangeSize = (defaultNodeWidth, defaultNodeHeight) => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    defaultNodeWidth,
    defaultNodeHeight
  }
});

/* UNDO, REDO */

export const undo = () => ({
  type: ACTIVE_MAP_UNDO,
  payload: {}
});

export const redo = () => ({
  type: ACTIVE_MAP_REDO,
  payload: {}
});

/* CHANGES ON PANEL */

export const setActiveNode = index => ({
  type: ACTIVE_MAP_NODE_ACTIVE,
  payload: { index }
});

export const newNode = () => (dispatch, getState) => {
  const activeMap = find(getState().maps.list, m => m.active);

  const yPos = !isEmpty(activeMap.nodes)
    ? maxBy(activeMap.nodes, n => n.y).y +
      maxBy(activeMap.nodes, n => n.y).height +
      10
    : 10;

  dispatch({
    type: ACTIVE_MAP_NODE_ADD,
    payload: {
      node: {
        title: NEW_NODE_TITLE,
        color: activeMap.defaultNodeColor,
        borderColor: activeMap.defaultNodeBorderColor,
        titleColor: activeMap.defaultNodeTitleColor,
        x: 10,
        y: yPos,
        width: activeMap.defaultNodeWidth,
        height: activeMap.defaultNodeHeight,
        font: activeMap.defaultNodeFont,
        fontSize: activeMap.defaultNodeFontSize,
        active: false
      }
    }
  });
};

export const activeNodeChangeTitle = title => ({
  type: ACTIVE_MAP_NODE_CHANGE,
  payload: {
    title
  }
});

export const removeNode = () => ({
  type: ACTIVE_MAP_NODE_REMOVE,
  payload: {}
});

export const activeNodeChangeColor = (color, borderColor, titleColor) => ({
  type: ACTIVE_MAP_NODE_CHANGE,
  payload: {
    color,
    borderColor,
    titleColor
  }
});

export const activeNodeChangeFont = (font, fontSize) => ({
  type: ACTIVE_MAP_NODE_CHANGE,
  payload: {
    font,
    fontSize
  }
});

export const changeZoom = zoom => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    zoom
  }
});
