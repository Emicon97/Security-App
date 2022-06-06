import axios from "axios";
import {
  GET_USER_ID,
  GET_TODOS,
  GET_TODOS_ID,
  UPDATE_TASK_STATUS,
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  UPDATE_USER,
  DELETE_USER,
  LOGIN_PRUEBA,
  GET_USERS_PAGINATE,
} from "./ActionTypes";

export function getUsersById(id, header){
    return async function(dispatch){
        const employees = await axios.get(`http://localhost:3001/user/${id}`, header);
        return dispatch({
          type:GET_USER_ID,
          payload: employees.data
        });
}
}

export function getToDos(){
  return async function(dispatch){
      const todos = await axios.get(`https://centinel.herokuapp.com/todos`);
    return dispatch({
      type:GET_TODOS,
      payload: todos.data
    });
}
}

export function getToDosById(id){
  return async function(dispatch){
      const todos = await axios.get(`https://centinel.herokuapp.com/todos/${id}`);
    return dispatch({
      type: GET_TODOS_ID,
      payload: todos.data
    });
  }
}

export function updateStatus(id,status){
  return async function(dispatch){
    const state = await axios.put(`https://centinel.herokuapp.com/todos/${id}`, status)
    return dispatch({
      type: UPDATE_TASK_STATUS,
      payload: state.data
    })
  }
}

export function filterByPriority(id,priority){
  return async function(dispatch){
    const state = await axios.get(`https://centinel.herokuapp.com/todos/${id}/?priority=${priority}`)
    return dispatch({
      type: GET_TODOS_ID,
      payload: state.data
    });
  }
}

export function filterByStatus(id, status){
  return async function(dispatch){
    const state = await axios.get(`https://centinel.herokuapp.com/todos/${id}/${status}`);
    return dispatch({
      type: GET_TODOS_ID,
      payload: state.data
    });
  }
}

export function filterByStatusAndPriority(id,status,priority){
  return async function(dispatch){
    const state = await axios.get(`https://centinel.herokuapp.com/todos/${id}/${status}/?priority=${priority}`)
    return dispatch({
      type: GET_TODOS_ID,
      payload: state.data
    })
  }
}

export function postUser(post, header){
  return async function(dispatch){
      const user = await axios.post("https://centinel.herokuapp.com/user", post, header)
      return user;
  }
}

export function getEmployees(id, header){
  return async function(dispatch){
    const users = await axios.get(`https://centinel.herokuapp.com/user/employees/${id}`,header)
    return dispatch({
      type: GET_EMPLOYEES,
      payload: users.data
    });
  }
}

export function searchEmployees(id, name){
  return async function(dispatch){
    const users = await axios.get(`https://centinel.herokuapp.com/user/employees/${id}?name=${name}`);
    return dispatch({
      type:GET_EMPLOYEES,
      payload: users.data
    });
  }
};

export function getEmployeeById(id){
  return async function(dispatch){
    const user = await axios.get(`https://centinel.herokuapp.com/user/${id}`);
    return dispatch({
      type:GET_EMPLOYEE_BY_ID,
      payload: user.data
    });
  }
};

export function updateUser(id, post){
  return async function(dispatch){
    const user = await axios.put(`https://centinel.herokuapp.com/user/${id}`, post);
    return dispatch({
      type: UPDATE_USER,
      payload: user.data
    });
  }
}

export function deleteUser(id, header){
  return async function(dispatch){
    const user = await axios.delete(`https://centinel.herokuapp.com/user/${id}`, header);
    return dispatch({
      type: DELETE_USER,
      payload: user.data
    });
  }
}
export function loginPrueba(value, header){
  return async function(dispatch){
    const user = await axios.post(`https://centinel.herokuapp.com/login`, value, header);
    return dispatch({
      type: LOGIN_PRUEBA,
      payload: user.data
    })
  }
}
export function getUsersPaginate(id, limit, skip, name = "", header) {
  return async function(dispatch){
    const users = await axios.get(`http://localhost:3001/paginated/${id}?limit=${limit}&skip=${skip}&name=${name}`, header);
    return dispatch({
      type: GET_USERS_PAGINATE,
      payload: users.data.supervisor,
    })
  }
}
export function headerTest(id, header){
  return async function(dispatch){
    const users = await axios.get(`https://centinel.herokuapp.com/user/employees/${id}`, header)
    return dispatch({
      type: GET_EMPLOYEES,
      payload: users.data
    });
  }
}