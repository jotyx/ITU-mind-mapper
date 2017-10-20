import * as c from "./constants";

export const setSample = () => ({
  type: c.CONSTANT,
  payload: { sample: true }
});

export const setDialog = (name, data) => ({
  type: c.DIALOG,
  payload: {
    name,
    data
  }
});

export const closeDialog = () => ({
  type: c.DIALOG,
  payload: { name: null, data: null }
});
