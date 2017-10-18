import { map } from "lodash";

import * as c from "../actions/constants";

const initialState = {
  list: [
    { label: "Mapa 1", active: true },
    { label: "Mapa 2", active: false },
    { label: "Mapa 3", active: false }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.MAPS:
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
    default:
      return state;
  }
};

export default reducer;
