import {
  GET_USER,
  GET_TODOS,
  GET_TODOS_ID,
  GET_USER_ID,
  UPDATE_TASK_STATUS,
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
} from "./ActionTypes";

const initialState = {
  supervisorDetail: {},
  watcherDetail: {},
  employees: [],
  users: [],
  userDetails: {},
  todosId: [],
  todos: [],
  todoUpdate: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_ID:
      return {
        ...state,
        userDetails: action.payload,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case GET_TODOS_ID:
      return {
        ...state,
        todosId: action.payload,
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        todoUpdate: action.payload,
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case GET_EMPLOYEE_BY_ID:
      return {
        ...state,
        watcherDetail: action.payload,
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
