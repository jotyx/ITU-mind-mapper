import { map, filter } from "lodash";

import * as c from "../actions/constants";

const initialState = {
  list: [{ name: `${c.NEW_MAP_NAME} 1`, active: true, nodes: [] }]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.MAPS_ACTIVE:
      return {
        ...state,
        list: map(
          state.list,
          (item, i) =>
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
        list: filter(state.list, (item, i) => item.name !== action.payload.name)
      };
    case c.MAPS_RENAME:
      return {
        ...state,
        list: map(
          state.list,
          (item, i) =>
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
          (item, i) =>
            item.active
              ? { ...item, nodes: [...item.nodes, action.payload.node] }
              : item
        )
      };
    case c.ACTIVE_MAP_NODE_ACTIVE:
      return {
        ...state,
        list: map(
          state.list,
          (item, i) =>
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
    case c.ACTIVE_MAP_NODE_TITLE_CHANGE:
      return {
        ...state,
        list: map(
          state.list,
          (item, i) =>
            item.active
              ? {
                  ...item,
                  nodes: map(
                    item.nodes,
                    (n, i) =>
                      i === action.payload.index
                        ? { ...n, title: action.payload.title }
                        : n
                  )
                }
              : item
        )
      };
    default:
      return state;
  }
};

export default reducer;
