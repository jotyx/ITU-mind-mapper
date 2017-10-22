import { find, maxBy, isEmpty, findIndex } from "lodash";

import {
  ACTIVE_MAP_NODE_ADD,
  NEW_NODE_TITLE,
  ACTIVE_MAP_NODE_ACTIVE,
  ACTIVE_MAP_NODE_TITLE_CHANGE
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
        color: "white",
        x: 10,
        y: yPos,
        width: 200,
        height: 100,
        titleColor: "black",
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

export const activeNodeChangeTitle = title => (dispatch, getState) => {
  dispatch({
    type: ACTIVE_MAP_NODE_TITLE_CHANGE,
    payload: {
      index: findIndex(
        find(getState().maps.list, m => m.active).nodes,
        n => n.active
      ),
      title
    }
  });
};
