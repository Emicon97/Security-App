import React from "react";
import { GET_USER , GET_TODOS} from "./ActionTypes";

const initialState = {
  bossDetail: {},
  supervisorDetail: {},
  watcherDetail: {},
  supervisors: [],
  watchers: [],
  users: [],
  todos:[]
};

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };
      case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
