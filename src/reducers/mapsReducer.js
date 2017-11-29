import { map, filter, isEmpty, find } from "lodash";

import * as c from "../actions/constants";

const initialState = {
  list: [ { ...require("../res/test_map.json"), active: true} ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.MAPS_ACTIVE:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.name === action.payload.name
              ? { ...item, active: true }
              : { ...item, active: false }
        )
      };
    case c.MAPS_ADD:
      return {
        ...state,
        list: [...state.list, action.payload.map]
      };
    case c.MAPS_REMOVE:
      return {
        ...state,
        list: filter(state.list, item => item.name !== action.payload.name)
      };
    case c.MAPS_RENAME:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.name === action.payload.oldName
              ? { ...item, name: action.payload.newName }
              : item
        )
      };
    case c.ACTIVE_MAP_NODE_ADD:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: [
                    ...map(
                      item.nodes,
                      n =>
                        action.payload.parent && n.active
                          ? {
                              ...n,
                              childNodes: [
                                ...n.childNodes,
                                action.payload.node.id
                              ]
                            }
                          : n
                    ),
                    action.payload.node
                  ],
                  undo: [
                    ...item.undo,
                    {
                      nodes: map(item.nodes, n => {
                        return { ...n, active: false };
                      })
                    }
                  ],
                  redo: []
                }
              : item
        )
      };
    case c.ACTIVE_MAP_NODE_ACTIVE:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    item.nodes,
                    (n, i) =>
                      i === action.payload.index
                        ? { ...n, active: !n.active }
                        : { ...n, active: false }
                  )
                }
              : item
        )
      };
    case c.ACTIVE_MAP_NODE_REMOVE:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    filter(
                      item.nodes,
                      n => !find(action.payload.ids, id => id === n.id)
                    ),
                    n => {
                      return {
                        ...n,
                        childNodes: filter(
                          n.childNodes,
                          ch => !find(action.payload.ids, id => id === ch)
                        )
                      };
                    }
                  ),
                  undo: [
                    ...item.undo,
                    {
                      nodes: map(item.nodes, n => {
                        return { ...n, active: false };
                      })
                    }
                  ],
                  redo: []
                }
              : item
        )
      };
    case c.ACTIVE_MAP_NODE_CHANGE:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    item.nodes,
                    n =>
                      n.active
                        ? {
                            ...n,
                            ...action.payload
                          }
                        : n
                  ),
                  undo: [
                    ...item.undo,
                    {
                      nodes: map(item.nodes, n => {
                        return { ...n, active: false };
                      })
                    }
                  ],
                  redo: []
                }
              : item
        )
      };
    case c.ACTIVE_MAP_CHANGE:
      return {
        ...state,
        list: map(
          state.list,
          item => (item.active ? { ...item, ...action.payload } : item)
        )
      };
    case c.ACTIVE_MAP_UNDO:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active && !isEmpty(item.undo)
              ? {
                  ...item,
                  ...item.undo[item.undo.length - 1],
                  redo: [
                    ...item.redo,
                    {
                      nodes: map(item.nodes, n => {
                        return { ...n, active: false };
                      })
                    }
                  ],
                  undo: item.undo.slice(0, item.undo.length - 1)
                }
              : item
        )
      };
    case c.ACTIVE_MAP_REDO:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active && !isEmpty(item.redo)
              ? {
                  ...item,
                  ...item.redo[item.redo.length - 1],
                  undo: [
                    ...item.undo,
                    {
                      nodes: map(item.nodes, n => {
                        return { ...n, active: false };
                      })
                    }
                  ],
                  redo: item.redo.slice(0, item.redo.length - 1)
                }
              : item
        )
      };
    case c.ACTIVE_MAP_NODES_MOVE_DOWN:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    item.nodes,
                    n =>
                      n.y >= action.payload.y
                        ? { ...n, y: n.y + action.payload.size }
                        : n
                  )
                }
              : item
        )
      };
    case c.ACTIVE_MAP_NODE_MOVE_RIGHT:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    item.nodes,
                    n =>
                      n.id === action.payload.id
                        ? { ...n, x: n.x + action.payload.size }
                        : n
                  )
                }
              : item
        )
      };
      case c.ACTIVE_MAP_NODE_MOVE_UP:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    item.nodes,
                    n =>
                      n.id === action.payload.id
                        ? { ...n, y: n.y - action.payload.size }
                        : n
                  )
                }
              : item
        )
      };
    case c.ACTIVE_MAP_NODES_MOVE_UP:
      return {
        ...state,
        list: map(
          state.list,
          item =>
            item.active
              ? {
                ...item,
                nodes: map(
                  item.nodes,
                  n =>
                    n.y >= action.payload.y
                      ? { ...n, y: n.y - action.payload.size}
                      : n
                )
              }
            : item
        )
      };
    case c.ACTIVE_MAP_NODE_RESIZE:
      return {
        ...state,
        list: map(
          state.list,
          map_item => map_item.active
              ? {
                  ...map_item,
                  nodes: map(
                    map_item.nodes,
                    node => node.active
                        ? {
                            ...node,
                            ...action.payload
                          }
                        : node
                  )
                }
              : map_item
        )
      };
    default:
      return state;
  }
};

export default reducer;
