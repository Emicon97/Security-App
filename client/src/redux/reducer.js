import { GET_USER , GET_TODOS, GET_TODOS_ID} from "./ActionTypes";

const initialState = {
  bossDetail: {},
  supervisorDetail: {},
  watcherDetail: {},
  supervisors: [],
  watchers: [],
  users: [],
  todosId:[],
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
    
  case GET_TODOS_ID:
      return {
        ...state,
        todosId: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
