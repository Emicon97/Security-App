import React from "react";
import { GET_BOSS } from "./ActionTypes";

const initialState = {
  bossDetail: {},
  supervisorDetail: {},
  watcherDetail: {},
  supervisors: [],
  watchers: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOSS:
      return {
        ...state,
        bossDetail: payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
