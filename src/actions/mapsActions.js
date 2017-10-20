import { filter, map, max, find, findIndex } from "lodash";

import { MAPS_ACTIVE, MAPS_ADD, NEW_MAP_LABEL, MAPS_REMOVE } from "./constants";

export const setActiveMap = label => ({
  type: MAPS_ACTIVE,
  payload: { label }
});

export const newMap = () => (dispatch, getState) => {
  const maxNum = max(
    map(
      filter(getState().maps.list, m =>
        m.label.match(new RegExp("^" + NEW_MAP_LABEL + " \\d+$"))
      ),
      m => parseInt(m.label.replace(/^\D+/g, ""))
    )
  );

  const label =
    maxNum === undefined
      ? `${NEW_MAP_LABEL} 1`
      : `${NEW_MAP_LABEL} ${maxNum + 1}`;

  dispatch({
    type: MAPS_ADD,
    payload: {
      map: {
        label
      }
    }
  });

  dispatch(setActiveMap(label));
};

export const removeMap = label => (dispatch, getState) => {
  const maps = getState().maps.list;

  if (find(maps, m => m.label === label).active) {
    const index = findIndex(maps, m => m.label === label);
    dispatch(setActiveMap(index === 0 ? maps[1].label : maps[index - 1].label));
  }

  dispatch({
    type: MAPS_REMOVE,
    payload: { label }
  });
};
