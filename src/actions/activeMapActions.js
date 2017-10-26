import { find, maxBy, isEmpty, concat, forEach } from "lodash";

import {
  ACTIVE_MAP_NODE_ADD,
  NEW_NODE_TITLE,
  ACTIVE_MAP_NODE_ACTIVE,
  ACTIVE_MAP_NODE_CHANGE,
  ACTIVE_MAP_NODE_REMOVE,
  ACTIVE_MAP_CHANGE,
  ACTIVE_MAP_UNDO,
  ACTIVE_MAP_REDO,
  MAP_SPACE_FACTOR,
  ACTIVE_MAP_NODES_MOVE_DOWN,
  ACTIVE_MAP_NODE_MOVE_RIGHT
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

export const backgroundColorChange = backgroundColor => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    backgroundColor
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

export const moveNodesDown = (y, size) => ({
  type: ACTIVE_MAP_NODES_MOVE_DOWN,
  payload: { y, size }
});

export const moveNodeRight = (id, size) => ({
  type: ACTIVE_MAP_NODE_MOVE_RIGHT,
  payload: { id, size }
});

export const newNode = parent => (dispatch, getState) => {
  const activeMap = find(getState().maps.list, m => m.active);

  const space =
    (activeMap.defaultNodeWidth + activeMap.defaultNodeHeight) /
    MAP_SPACE_FACTOR;

  const xPos = parent
    ? isEmpty(parent.childNodes)
      ? parent.x + parent.width + space
      : find(activeMap.nodes, n => n.id === parent.childNodes[0]).x
    : space;

  let max = null;
  if (parent) {
    for (let i = 0; i < parent.childNodes.length; i++) {
      if (
        !max ||
        find(activeMap.nodes, n => n.id === parent.childNodes[i]).y > max.y
      ) {
        max = find(activeMap.nodes, n => n.id === parent.childNodes[i]);
      }
    }
  }

  const yPos = !isEmpty(activeMap.nodes)
    ? parent
      ? isEmpty(parent.childNodes) ? parent.y : max.y + max.height + space
      : maxBy(activeMap.nodes, n => n.y).y +
        maxBy(activeMap.nodes, n => n.y).height +
        space
    : space;

  if (parent && !isEmpty(parent.childNodes)) {
    dispatch(moveNodesDown(yPos, activeMap.defaultNodeHeight + space));
  }

  dispatch({
    type: ACTIVE_MAP_NODE_ADD,
    payload: {
      node: {
        id: activeMap.nextNodeId,
        title: NEW_NODE_TITLE,
        color: activeMap.defaultNodeColor,
        borderColor: activeMap.defaultNodeBorderColor,
        titleColor: activeMap.defaultNodeTitleColor,
        x: xPos,
        y: yPos,
        width: activeMap.defaultNodeWidth,
        height: activeMap.defaultNodeHeight,
        font: activeMap.defaultNodeFont,
        fontSize: activeMap.defaultNodeFontSize,
        active: false,
        childNodes: []
      },
      parent
    }
  });

  dispatch({
    type: ACTIVE_MAP_CHANGE,
    payload: {
      nextNodeId: activeMap.nextNodeId + 1
    }
  });
};

export const moveDescendantsToRight = node => (dispatch, getState) => {
  forEach(node.childNodes, n => {
    dispatch(
      moveNodeRight(
        n,
        (find(getState().maps.list, m => m.active).defaultNodeWidth +
          find(getState().maps.list, m => m.active).defaultNodeHeight) /
          MAP_SPACE_FACTOR
      )
    );
    dispatch(
      moveDescendantsToRight(
        find(find(getState().maps.list, m => m.active).nodes, l => l.id === n)
      )
    );
  });
};

export const newChildNode = () => (dispatch, getState) => {
  forEach(
    find(find(getState().maps.list, m => m.active).nodes, n => n.active)
      .childNodes,
    n => {
      dispatch(
        moveNodeRight(
          n,
          (find(getState().maps.list, m => m.active).defaultNodeWidth +
            find(getState().maps.list, m => m.active).defaultNodeHeight) /
            MAP_SPACE_FACTOR
        )
      );
      dispatch(
        moveDescendantsToRight(
          find(find(getState().maps.list, m => m.active).nodes, l => l.id === n)
        )
      );
    }
  );

  dispatch(
    newNode(
      find(find(getState().maps.list, m => m.active).nodes, n => n.active)
    )
  );
};

export const activeNodeChangeTitle = title => ({
  type: ACTIVE_MAP_NODE_CHANGE,
  payload: {
    title
  }
});

export const getAllDescendantsIds = node => (dispatch, getState) => {
  if (isEmpty(node.childNodes)) return [];

  let ids = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    ids = concat(
      ids,
      dispatch(
        getAllDescendantsIds(
          find(
            find(getState().maps.list, m => m.active).nodes,
            n => n.id === node.childNodes[i]
          )
        )
      )
    );
  }

  return [...node.childNodes, ...ids];
};

export const removeNode = () => (dispatch, getState) => {
  const activeNode = find(
    find(getState().maps.list, m => m.active).nodes,
    n => n.active
  );

  const ids = isEmpty(activeNode.childNodes)
    ? [activeNode.id]
    : [activeNode.id, ...dispatch(getAllDescendantsIds(activeNode))];

  if (activeNode)
    dispatch({
      type: ACTIVE_MAP_NODE_REMOVE,
      payload: { ids }
    });
};

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
