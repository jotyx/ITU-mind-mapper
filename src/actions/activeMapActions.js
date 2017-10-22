import { find, maxBy, isEmpty } from "lodash";

import {
  ACTIVE_MAP_NODE_ADD,
  NEW_NODE_TITLE,
  ACTIVE_MAP_NODE_ACTIVE,
  ACTIVE_MAP_NODE_CHANGE,
  ACTIVE_MAP_NODE_REMOVE
} from "./constants";

export const newNode = () => (dispatch, getState) => {
  const yPos = !isEmpty(find(getState().maps.list, m => m.active).nodes)
    ? maxBy(find(getState().maps.list, m => m.active).nodes, n => n.y).y +
      maxBy(find(getState().maps.list, m => m.active).nodes, n => n.y).height +
      10
    : 10;

  dispatch({
    type: ACTIVE_MAP_NODE_ADD,
    payload: {
      node: {
        title: NEW_NODE_TITLE,
        color: "#FFFFFF",
        x: 10,
        y: yPos,
        width: 200,
        height: 100,
        titleColor: "#111111",
        fontSize: 20,
        active: false
      }
    }
  });
};

export const setActiveNode = index => ({
  type: ACTIVE_MAP_NODE_ACTIVE,
  payload: { index }
});

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

export const activeNodeChangeColor = (color, titleColor) => ({
  type: ACTIVE_MAP_NODE_CHANGE,
  payload: {
    color,
    titleColor
  }
});
