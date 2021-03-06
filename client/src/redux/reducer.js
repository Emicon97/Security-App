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
  LOGOUT,
  DESTROY,
  GET_REPORT_TASKS,
  GET_REPORTS,
  POST_REPORT_TASKS,
  TEMP_VERIFICATION,
  ENVIRONMENTS,
  ENVIRONMENT_USERS,
  RESET_REPORT,
  RESET_USER,
  CREATE_ENVIRONMENT
} from "./ActionTypes";

const initialState = {
  supervisorDetail: {},
  watcherDetail: {},
  employees: [],
  users: [],
  userDetails: [],
  todosId: [],
  todos: [],
  todoUpdate: {},
  userData: [],
  usersPaginate: [],
  token: "",
  taskReports: [],
  reports: [],
  reports: [],
  temp: "",
  environments: [],
  environmentUsers: []
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
    case UPDATE_USER:
      return {
        ...state,
        userDetails: payload,
      };
    case DELETE_USER:
      return {
        ...state,
      };
    case GET_USERS_PAGINATE:
      return {
        ...state,
        usersPaginate: payload,
      };
    case LOGIN_PRUEBA:
      return {
        ...state,
        userData: payload,
        token: payload[2]
      };
    case LOGOUT:
      return {
        ...state,
        token: payload
      };
    case GET_REPORT_TASKS:
      return {
        ...state,
        taskReports: payload
      };
    case POST_REPORT_TASKS:
      return {
        ...state,
        taskReports: payload,
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: payload
      };
    case ENVIRONMENTS:
      return {
        ...state,
        environments: payload
      }
    case ENVIRONMENT_USERS:
      return {
        ...state,
        environmentUsers: payload
      }
    case DESTROY:
      return {
        ...state,
        supervisorDetail: {},
        watcherDetail: {},
        employees: [],
        users: [],
        userDetails: {},
        todosId: [],
        todos: [],
        todoUpdate: {},
        userData: [],
        usersPaginate: [],
        reports: [],
        taskReports: [],
      };
     case TEMP_VERIFICATION:
      return {
        ...state,
        temp: payload
      }
      case CREATE_ENVIRONMENT:
        console.log('reducer',payload)
        return{
          ...state,
          enviroment: payload
        }
      case RESET_REPORT:
        return{
          ...state,
          reports: [],
          taskReports: []
        }
        case RESET_USER:
          return{
            ...state,
            userDetails: [],
            todosId: [],
          }
    default:
      return { ...state };
  }
};

export default rootReducer;
