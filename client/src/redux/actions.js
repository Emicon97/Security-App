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
  ADD_TASK_TO_USER,
  DESTROY,
  GET_REPORT_TASKS,
  CREATE_ENVIRONMENT,
  GET_REPORTS,
  POST_REPORT_TASKS,
  RESET_REPORT
} from "./ActionTypes";
import swal from "sweetalert";
import { url } from './url';
import { SaveToken, SaveRefreshToken, SaveId, SaveUser } from './LocalStorage';

export function getUsersById(id, header){
    return async function(dispatch){
      try{
        const employees = await axios.get(`${url}/user/${id}`, header);
        return dispatch({
          type:GET_USER_ID,
          payload: employees.data
        });
      }catch(err){
        console.log(err.response.data)
    }
  }
}

export function getToDos(header){
  return async function(dispatch){
    try{
      const todos = await axios.get(`${url}/todos`, header);
      return dispatch({
        type:GET_TODOS,
        payload: todos.data
      });
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function getToDosById(id, header){
  return async function(dispatch){
    try{

      const todos = await axios.get(`${url}/todos/${id}`, header);
      return dispatch({
        type: GET_TODOS_ID,
        payload: todos.data
      });
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function addTaskToUser(body, header){
  return async function(dispatch){
    try{
      const todos = await axios.post(`${url}/todos/`, body, header);
      return dispatch({
        type: ADD_TASK_TO_USER,
        payload: todos.data
      });
    }catch(err){
      swal(err.response.data)
    }
  }
}


export function updateStatus(id, status, header){
  return async function(dispatch){
    try{
      const state = await axios.put(`${url}/todos/${id}`, status, header)
      return dispatch({
        type: UPDATE_TASK_STATUS,
        payload: state.data
      })
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function filterByPriority(id,priority, header){
  return async function(dispatch){
    try{
      const state = await axios.get(`${url}/todos/${id}/?priority=${priority}`, header)
      return dispatch({
        type: GET_TODOS_ID,
        payload: state.data
      });
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function filterByStatus(id, status, header){
  return async function(dispatch){
    const state = await axios.get(`${url}/todos/${id}/${status}`, header);
    try{
      return dispatch({
        type: GET_TODOS_ID,
        payload: state.data
      });
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function filterByStatusAndPriority(id,status,priority, header){
  return async function(dispatch){
    try{
      const state = await axios.get(`${url}/todos/${id}/${status}/?priority=${priority}`, header)
      return dispatch({
        type: GET_TODOS_ID,
        payload: state.data
      })
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function postUser(post, header, id){
  return async function(dispatch){
      try{
        await axios.post(`${url}/user/${id}`, post, header)
        return "User created successfully";
      }catch(err){
        console.log(err.response.data)
      }
  }
}

export function getEmployees(id, header){
  return async function(dispatch){
    try{
      const users = await axios.get(`${url}/user/employees/${id}`, header)
      return dispatch({
        type: GET_EMPLOYEES,
        payload: users.data
      });
    }catch(err){
      console.log(err)
    }
  }
}

export function getEmployeeById(id, header){
  return async function(dispatch){
    try{
      const user = await axios.get(`${url}/user/${id}`, header);
      return dispatch({
        type:GET_EMPLOYEE_BY_ID,
        payload: user.data
      });
    }catch(err){
      console.log(err.response.data)
    }
  }
};

export function updateUser(id, post, header){
  return async function(dispatch){
    try{
      const user = await axios.put(`${url}/user/${id}`, post, header);
      return dispatch({
        type: UPDATE_USER,
        payload: user.data
      });
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function updateEmployees(id, post, header){
  return async function(){
    try{
      await axios.put(`${url}/user/${id}`, post, header)
    }catch(error){
      console.log(error.response.data)
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
      console.log(err.response.data)
    }
  }
}
export function loginPrueba(value){
  return async function(dispatch){
    try{
      const user = await axios.post(`${url}/login`, value);
      SaveId(user.data[0]._id);
      SaveUser(user.data[1]);
      SaveToken(user.data[2]);
      SaveRefreshToken(user.data[3]);
      return dispatch({
        type: LOGIN_PRUEBA,
        payload: user.data
      })
    }catch(err){
      console.log(err.response.data)
    }
  }
}

export function logout(){
  localStorage.removeItem('auth-token');
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
      console.log(err.response.data)
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
      console.log(err.response.data)
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

export function getTaskReports(id, header){
  return async function(dispatch){
    try{
      const reports = await axios.get(`${url}/todos/reports/${id}`, header);
      return dispatch({
        type: GET_REPORT_TASKS,
        payload: reports.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}

export function createEnvironment(name,header){
  return async function(dispatch){
    try{
      const enviro = await axios.post(`${url}/environment/`,name, header);
      return dispatch({
        type: CREATE_ENVIRONMENT,
        payload: enviro.data
      })
      }catch(err){
        window.alert(err.response.data)
    }
  }
}

export function getReports(id, relation, header){
  return async function(dispatch){
    try{
      const reports = await axios.get(`${url}/report/${id}?relation=${relation}`, header);
      return dispatch({
        type: GET_REPORTS,
        payload: reports.data
      })
    }catch(error){
      window.alert(error.response.data)
    }
  }
}

export function postTaskReports(id, body, header){
  return async function(dispatch){
    try{
      const report = await axios.post(`${url}/report/${id}`, body, header);
      return dispatch({
        type: POST_REPORT_TASKS,
        payload: report.data
      })
    }catch(err){
      window.alert(err.response.data)
    }
  }
}
export function resetReport(){
  return async function(dispatch){
    return dispatch({
      type: RESET_REPORT
    })
  }
}