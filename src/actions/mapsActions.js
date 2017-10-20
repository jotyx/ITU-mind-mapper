import { filter, map, max, find, findIndex } from "lodash";

import {
  MAPS_ACTIVE,
  MAPS_ADD,
  NEW_MAP_NAME,
  MAPS_REMOVE,
  MAPS_RENAME
} from "./constants";

export const setActiveMap = name => ({
  type: MAPS_ACTIVE,
  payload: { name }
});

export const newMap = () => (dispatch, getState) => {
  const maxNum = max(
    map(
      filter(getState().maps.list, m =>
        m.name.match(new RegExp("^" + NEW_MAP_NAME + " \\d+$"))
      ),
      m => parseInt(m.name.replace(/^\D+/g, ""))
    )
  );

  const name =
    maxNum === undefined
      ? `${NEW_MAP_NAME} 1`
      : `${NEW_MAP_NAME} ${maxNum + 1}`;

  dispatch({
    type: MAPS_ADD,
    payload: {
      map: {
        name
      }
    }
  });

  dispatch(setActiveMap(name));
};

export const removeMap = name => (dispatch, getState) => {
  const maps = getState().maps.list;

  if (find(maps, m => m.name === name).active) {
    const index = findIndex(maps, m => m.name === name);
    dispatch(setActiveMap(index === 0 ? maps[1].name : maps[index - 1].name));
  }

  dispatch({
    type: MAPS_REMOVE,
    payload: { name }
  });
};

export const renameMap = (oldName, newName) => (dispatch, getState) => {
  if (oldName === newName) return true;

  if (find(getState().maps.list, m => m.name === newName)) return false;

  dispatch({
    type: MAPS_RENAME,
    payload: { oldName, newName }
  });

  return true;
};
