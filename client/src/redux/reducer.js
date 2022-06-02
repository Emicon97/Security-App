import { GET_USER , GET_TODOS, GET_TODOS_ID, GET_USER_ID, UPDATE_TASK_STATUS, GET_EMPLOYEES, LOGIN_PRUEBA } from "./ActionTypes";

const initialState = {
  supervisorDetail: {},
  watcherDetail: {},
  employees: [],
  users: [],
  userDetails: {},
  todosId:[],
  todos:[],
  todoUpdate: {},
  userData:{}
};

const rootReducer = (state=initialState, {type,payload}) => {
  switch (type) {
    case GET_USER:
    return {
        ...state,
        users: payload,
      };
      case GET_USER_ID:
        return {
          ...state,
          userDetails: payload
        }
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
        todoUpdate: payload
      }
      case GET_EMPLOYEES: 
      return {
        ...state,
        employees: payload
      }
      case LOGIN_PRUEBA:
      return {
        ...state,
        
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
