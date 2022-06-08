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
  LOGOUT,
  DESTROY
} from "./ActionTypes";

import { url } from './url';

export function getUsersById(id, header){
    return async function(dispatch){
      try{
        const employees = await axios.get(`${url}/user/${id}`, header);
        return dispatch({
          type:GET_USER_ID,
          payload: employees.data
        });
      }catch(err){
        window.alert(err.response.data)
    }
  }
}

export function getToDos(){
  return async function(dispatch){
    try{
      const todos = await axios.get(`${url}/todos`);
      return dispatch({
        type:GET_TODOS,
        payload: todos.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function getToDosById(id){
  return async function(dispatch){
    try{

      const todos = await axios.get(`${url}/todos/${id}`);
      return dispatch({
        type: GET_TODOS_ID,
        payload: todos.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function updateStatus(id,status){
  return async function(dispatch){
    try{
      const state = await axios.put(`${url}/todos/${id}`, status)
      return dispatch({
        type: UPDATE_TASK_STATUS,
        payload: state.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function filterByPriority(id,priority){
  return async function(dispatch){
    try{
      const state = await axios.get(`${url}/todos/${id}/?priority=${priority}`)
      return dispatch({
        type: GET_TODOS_ID,
        payload: state.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function filterByStatus(id, status){
  return async function(dispatch){
    const state = await axios.get(`${url}/todos/${id}/${status}`);
    try{
      return dispatch({
        type: GET_TODOS_ID,
        payload: state.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function filterByStatusAndPriority(id,status,priority){
  return async function(dispatch){
    try{
      const state = await axios.get(`${url}/todos/${id}/${status}/?priority=${priority}`)
      return dispatch({
        type: GET_TODOS_ID,
        payload: state.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function postUser(post, header, id){
  return async function(dispatch){
      try{
        await axios.post(`${url}/user/${id}`, post, header)
        return "User created successfully";
      }catch(err){
        window.alert(err.response.data)
      }
  }
}

export function getEmployees(id, header){
  return async function(dispatch){
    try{
      const users = await axios.get(`${url}/user/employees/${id}`,header)
      return dispatch({
        type: GET_EMPLOYEES,
        payload: users.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function searchEmployees(id, name){
  return async function(dispatch){
    try{
      const users = await axios.get(`${url}/user/employees/${id}?name=${name}`);
      return dispatch({
        type:GET_EMPLOYEES,
        payload: users.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
};

export function getEmployeeById(id){
  return async function(dispatch){
    try{
      const user = await axios.get(`${url}/user/${id}`);
      return dispatch({
        type:GET_EMPLOYEE_BY_ID,
        payload: user.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
};

export function updateUser(id, post){
  return async function(dispatch){
    try{
      const user = await axios.put(`${url}/user/${id}`, post);
      return dispatch({
        type: UPDATE_USER,
        payload: user.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function deleteUser(id, header){
  return async function(dispatch){
    try{
      const user = await axios.delete(`${url}/user/${id}`, header);
      return dispatch({
        type: DELETE_USER,
        payload: user.data
      });
    }catch(err){
      window.alert(err.response.data)
    }
  }
}
export function loginPrueba(value, header){
  return async function(dispatch){
    try{
      const user = await axios.post(`${url}/login`, value);
      return dispatch({
        type: LOGIN_PRUEBA,
        payload: user.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function logout(){
  return async function(dispatch){
    try{
      const user =await axios.get(`${url}/logout`);
      console.log('user',user)
      return dispatch({
        type:LOGOUT,
        payload: user.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}
export function getUsersPaginate(id, limit, skip, name, header) {
  return async function(dispatch){
    try{
      const users = await axios.get(`${url}/paginated/${id}?limit=${limit}&skip=${skip}&name=${name}`, header);
      return dispatch({
        type: GET_USERS_PAGINATE,
        payload: users.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function getUsersPaginateAll(id,limit,skip,header){
  return async function(dispatch){
    try{
      const users = await axios.get(`${url}/paginated/${id}?limit=${limit}&skip=${skip}`, header);
      return dispatch({
        type: GET_USERS_PAGINATE,
        payload: users.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function destroyData() {
  return function (dispatch) {
    return dispatch({
      type: DESTROY
    });
  };
}