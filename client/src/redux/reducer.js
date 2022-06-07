import {
  GET_USER,
  GET_TODOS,
  GET_TODOS_ID,
  GET_USER_ID,
  UPDATE_TASK_STATUS,
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  UPDATE_USER,
  DELETE_USER,
  LOGIN_PRUEBA,
  GET_USERS_PAGINATE,
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
  userData:{},
  usersPaginate: [],
  token: ''
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_ID:
      return {
        ...state,
        userDetails: payload,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    case GET_TODOS_ID:
      return {
        ...state,
        todosId: payload,
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        todoUpdate: payload,
      };
    case GET_EMPLOYEES:
      const array = payload.watcher ? payload.watcher : payload.supervisor;
      return {
        ...state,
        employees: array,
      };
    case GET_EMPLOYEE_BY_ID:
      return {
        ...state,
        watcherDetail: payload,
        todoUpdate: payload,
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        userDetails: payload,
      };
    case DELETE_USER:
      return {
        ...state,
      };
    // case LOGIN_PRUEBA:
    //   return {
    //     ...state,
    //     userData: payload,
    //   };
    case GET_USERS_PAGINATE:
      let employees;
      if(state.userData[1] === "supervisor"){
        employees = payload[0].watcher
      }else if (state.userData[1] === "boss"){
        employees = payload[0].supervisor
      }
      return {
        ...state,
        usersPaginate: employees,
      };
    case LOGIN_PRUEBA:
      return {
        ...state,
        userData: payload,
        token: payload[2]
      }
    default:
      return { ...state };
  };
};

export default rootReducer;
