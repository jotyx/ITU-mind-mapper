import {
  find,
  maxBy,
  isEmpty,
  concat,
  forEach,
  filter,
  map,
  minBy
} from "lodash";

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
  ACTIVE_MAP_NODE_MOVE_RIGHT,
  ACTIVE_MAP_NODE_MOVE_LEFT,
  ACTIVE_MAP_NODES_MOVE_UP,
  ACTIVE_MAP_NODE_MOVE_UP,
  ACTIVE_MAP_NODE_MOVE_DOWN,
  ACTIVE_MAP_NODE_RESIZE
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

export const lineColorChange = lineColor => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    lineColor
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

export const moveNodesUp = (y, size) => ({
  type: ACTIVE_MAP_NODES_MOVE_UP,
  payload: { y, size }
});

export const moveNodeRight = (id, size) => ({
  type: ACTIVE_MAP_NODE_MOVE_RIGHT,
  payload: { id, size }
});

export const moveNodeLeft = (id, size) => ({
  type: ACTIVE_MAP_NODE_MOVE_LEFT,
  payload: { id, size }
});

export const moveNodeUp = (id, size) => ({
  type: ACTIVE_MAP_NODE_MOVE_UP,
  payload: { id, size }
});

export const moveNodeDown = (id, size) => ({
  type: ACTIVE_MAP_NODE_MOVE_DOWN,
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

export const getMaxDepth = node => (dispatch, getState) => {
  const activeMap = find(getState().maps.list, m => m.active);

  let depth = 1;

  for (let i = 0; i < node.childNodes.length; i++) {
    // Cez všetky deti
    for (let j = 0; j < activeMap.nodes.length; j++) {
      // Hladáme dieťa vo všetkých uzloch
      if (activeMap.nodes[j].id === node.childNodes[i]) {
        // Našli sme child node
        if (i === 0 && isEmpty(activeMap.nodes[j].childNodes))
          // Ak je to prvy uzel, nič
          break;

        if (i === 0)
          // Ak je prvy a má deti, nepočítať ho
          depth--;

        depth += dispatch(getMaxDepth(activeMap.nodes[j]));
      }
    }
  }
  return depth;
};

export const removeNode = parent => (dispatch, getState) => {
  const activeNode = find(
    find(getState().maps.list, m => m.active).nodes,
    n => n.active
  );

  var levelOfMovingUp = activeNode.y;

  const ids = isEmpty(activeNode.childNodes)
    ? [activeNode.id]
    : [activeNode.id, ...dispatch(getAllDescendantsIds(activeNode))];

  const activeMap = find(getState().maps.list, m => m.active);

  const space =
    (activeMap.defaultNodeWidth + activeMap.defaultNodeHeight) /
    MAP_SPACE_FACTOR;

  // Hladame rodiča mazaného uzla a či je prvý z childov
  var parentID = null;
  var isFirst = false;
  for (let i = 0; i < activeMap.nodes.length; i++) {
    if (activeMap.nodes[i].childNodes.length > 0) {
      for (let j = 0; j < activeMap.nodes[i].childNodes.length; j++) {
        if (activeMap.nodes[i].childNodes[j] === activeNode.id) {
          parentID = activeMap.nodes[i].id;
          if (j === 0) {
            isFirst = true;
          }
        }
      }
    }
  }

  var depth = dispatch(getMaxDepth(activeNode));

  if (activeNode)
    dispatch({
      type: ACTIVE_MAP_NODE_REMOVE,
      payload: { ids }
    });

  // Vymazavame prvy child uzol
  if (isFirst) {
    for (let i = 0; i < activeMap.nodes.length; i++) {
      if (activeMap.nodes[i].id === parentID) {
        var arrayOfChilds = activeMap.nodes[i].childNodes;

        // Ak je to jediny child a ma max 1 potomka, neposuvať UP
        if (arrayOfChilds.length === 1 && activeNode.childNodes.length <= 1) {
          return;
        }
        break;
      }
    }

    // Hladame vysku posledneho childu pred vymazaním
    forEach(activeMap.nodes, node => {
      if (node.id === arrayOfChilds[arrayOfChilds.length - 1]) {
        levelOfMovingUp = node.y;
      }
    });

    forEach(arrayOfChilds, n => {
      dispatch(moveNodeUp(n, activeMap.defaultNodeHeight + space));
    });
  }

  for (let i = 0; i < depth; i++) {
    dispatch(moveNodesUp(levelOfMovingUp, activeMap.defaultNodeHeight + space));
  }
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

export const findParent = id => (_, getState) => {
  const activeMap = find(getState().maps.list, m => m.active);

  const parent = find(activeMap.nodes, node =>
    find(node.childNodes, n => n === id)
  );

  return parent;
};

/* RESIZE */

export const moveDescendantsToRightBySize = (node, size) => (
  dispatch,
  getState
) => {
  forEach(node.childNodes, n => {
    dispatch(moveNodeRight(n, size));
    dispatch(
      moveDescendantsToRightBySize(
        find(find(getState().maps.list, m => m.active).nodes, l => l.id === n)
          .id,
        size
      )
    );
  });
};

export const moveDescendantsToLeftBySize = (node, size) => (
  dispatch,
  getState
) => {
  forEach(node.childNodes, n => {
    dispatch(moveNodeLeft(n, size));
    dispatch(
      moveDescendantsToLeftBySize(
        find(find(getState().maps.list, m => m.active).nodes, l => l.id === n)
          .id,
        size
      )
    );
  });
};

export const moveDescendantsUpBySize = (node, size) => (dispatch, getState) => {
  forEach(node.childNodes, n => {
    dispatch(moveNodeUp(n, size));
    dispatch(
      moveDescendantsUpBySize(
        find(find(getState().maps.list, m => m.active).nodes, l => l.id === n)
          .id,
        size
      )
    );
  });
};

export const moveDescendantsDownBySize = (node, size) => (
  dispatch,
  getState
) => {
  forEach(node.childNodes, n => {
    dispatch(moveNodeDown(n, size));
    dispatch(
      moveDescendantsDownBySize(
        find(find(getState().maps.list, m => m.active).nodes, l => l.id === n)
          .id,
        size
      )
    );
  });
};

export const activeNodeResizeNode = (width, height) => ({
  type: ACTIVE_MAP_NODE_CHANGE,
  payload: { width, height }
});

export const activeNodeResizeNodePreview = (x, y, width, height) => (
  dispatch,
  getState
) => {
  const activeMap = find(getState().maps.list, m => m.active);
  const activeNode = find(activeMap.nodes, n => n.active);

  const space =
    (activeMap.defaultNodeWidth + activeMap.defaultNodeHeight) /
    MAP_SPACE_FACTOR;

  if (activeNode.width > width) {
    // left
    forEach(activeNode.childNodes, n => {
      dispatch(moveNodeLeft(n, activeNode.width - width));
      dispatch(
        moveDescendantsToLeftBySize(
          find(activeMap.nodes, node => node.id === n),
          activeNode.width - width
        )
      );
    });
  } else {
    // right
    const nodesToRight = filter(
      activeMap.nodes,
      n =>
        !n.active &&
        (x + width >= n.x - space &&
          n.x > x &&
          find(activeNode.childNodes, ch => ch === n.id) &&
          ((y >= n.y && y <= n.y + n.height) ||
            (n.y >= y && n.y <= y + height)))
    );

    if (!isEmpty(nodesToRight)) {
      forEach(activeNode.childNodes, n => {
        dispatch(moveNodeRight(n, x + width - (nodesToRight[0].x - space) + 1));
        dispatch(
          moveDescendantsToRightBySize(
            find(activeMap.nodes, node => node.id === n),
            x + width - (nodesToRight[0].x - space) + 1
          )
        );
      });
    }

    /*
    forEach(nodesToRight, n => {
      dispatch(moveNodeRight(n.id, x + width - (n.x - space) + 1));
      dispatch(moveDescendantsToRightBySize(n, x + width - (n.x - space) + 1));
    });
    */
  }

  if (activeNode.height > height) {
    // up
    if (dispatch(findParent(activeNode.id))) {
      forEach(dispatch(findParent(activeNode.id)).childNodes, ch => {
        if (find(activeMap.nodes, node => node.id === ch).y > y) {
          dispatch(moveNodeUp(ch, activeNode.height - height));
          dispatch(
            moveDescendantsUpBySize(
              find(activeMap.nodes, node => node.id === ch),
              activeNode.height - height
            )
          );
        }
      });
    } else {
      let flag = true;

      forEach(
        filter(
          activeMap.nodes,
          node => !dispatch(findParent(node.id)) && node.id !== activeNode.id
        ),
        node => {
          if (
            find(
              activeNode.childNodes,
              ch =>
                find(activeMap.nodes, n => n.id === ch).y +
                  find(activeMap.nodes, n => n.id === ch).height +
                  space >
                node.y
            )
          )
            flag = false;
        }
      );

      if (flag) {
        forEach(
          filter(activeMap.nodes, node => !dispatch(findParent(node.id))),
          node => {
            if (node.y > y) {
              dispatch(moveNodeUp(node.id, activeNode.height - height));
              dispatch(
                moveDescendantsUpBySize(node, activeNode.height - height)
              );
            }
          }
        );
      } else {
        const maxNode = maxBy(
          map(activeNode.childNodes, ch =>
            find(activeMap.nodes, n => n.id === ch)
          ),
          n => n.y
        );

        const minNode = minBy(
          filter(
            activeMap.nodes,
            node => !dispatch(findParent(node.id)) && node.id !== activeNode.id
          ),
          node => node.y > activeNode.y
        );

        forEach(
          filter(activeMap.nodes, node => !dispatch(findParent(node.id))),
          node => {
            if (
              (node.y > y &&
                maxNode.y + maxNode.height + space - minNode.y > 10) ||
              maxNode.y + maxNode.height + space - minNode.y < -10
            ) {
              dispatch(
                moveNodeDown(
                  node.id,
                  maxNode.y + maxNode.height + space - minNode.y
                )
              );
              dispatch(
                moveDescendantsDownBySize(
                  node,
                  maxNode.y + maxNode.height + space - minNode.y
                )
              );
            }
          }
        );
      }
    }
  } else {
    // down
    const nodesDown = filter(
      activeMap.nodes,
      n =>
        !n.active &&
        (y + height >= n.y - space &&
          n.y > y &&
          ((x >= n.x && x <= n.x + n.width) || (n.x >= x && n.x <= x + width)))
    );
    forEach(nodesDown, n => {
      if (dispatch(findParent(n.id))) {
        forEach(dispatch(findParent(n.id)).childNodes, ch => {
          if (find(activeMap.nodes, node => node.id === ch).y > y) {
            dispatch(moveNodeDown(ch, y + height - (n.y - space) + 1));
            dispatch(
              moveDescendantsDownBySize(
                find(activeMap.nodes, node => node.id === ch),
                y + height - (n.y - space) + 1
              )
            );
          }
        });
      } else {
        forEach(
          filter(activeMap.nodes, node => !dispatch(findParent(node.id))),
          node => {
            if (node.y > y) {
              dispatch(moveNodeDown(node.id, y + height - (n.y - space) + 1));
              dispatch(
                moveDescendantsDownBySize(node, y + height - (n.y - space) + 1)
              );
            }
          }
        );
      }
    });
  }

  dispatch({
    type: ACTIVE_MAP_NODE_RESIZE,
    payload: { x, y, width, height }
  });
};

export const changeZoom = zoom => ({
  type: ACTIVE_MAP_CHANGE,
  payload: {
    zoom
  }
});
