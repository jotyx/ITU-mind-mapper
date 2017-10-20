import { map, filter } from "lodash";

import * as c from "../actions/constants";

const initialState = {
  list: [
    { label: `${c.NEW_MAP_LABEL} 1`, active: true }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.MAPS_ACTIVE:
      return {
        ...state,
        list: map(
          state.list,
          (item, i) =>
            item.label === action.payload.label
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
        list: filter(
          state.list,
          (item, i) => item.label !== action.payload.label
        )
      };
    default:
      return state;
  }
};

export default reducer;
