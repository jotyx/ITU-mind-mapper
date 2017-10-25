import { map, filter, isEmpty } from "lodash";

import * as c from "../actions/constants";

const initialState = {
  list: []
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
                  nodes: [...item.nodes, action.payload.node],
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
                  nodes: filter(item.nodes, n => !n.active),
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
    default:
      return state;
  }
};

export default reducer;
