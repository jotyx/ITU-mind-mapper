import { MAPS } from "./constants";

export const setActiveMap = label => ({
  type: MAPS,
  payload: { label }
});
