import * as c from "../actions/constants";

const initialState = {
  sample: {},
  dialog: { name: null, data: null }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.CONSTANT:
      return { ...state, ...action.payload };
    case c.DIALOG:
      return { ...state, dialog: action.payload };
    default:
      return state;
  }
};

export default reducer;