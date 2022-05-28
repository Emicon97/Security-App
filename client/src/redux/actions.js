import axios from "axios";
import {
  CREATE_USER,
  VALIDATE_USER,
  DAILY_TASKS,
  GET_USER_ID,
  GET_BOSS,
  GET_TODOS,
  GET_TODOS_ID,
  UPDATE_TASK,
  UPDATE_TASK_STATUS
} from "./ActionTypes";

export function getUsersById(id){
    return async function(dispatch){
        const users = await axios.get(`http://localhost:3001/user/${id}`)
        return dispatch({type:GET_USER_ID, payload: users.data})
}
}

export function getToDos(){
  return async function(dispatch){
      const todos = await axios.get(`http://localhost:3001/todos`)
    return dispatch({type:GET_TODOS, payload: todos.data}) 
}
}

export function getToDosById(id){
  return async function(dispatch){
      const todos = await axios.get(`http://localhost:3001/todos/${id}`)
    return dispatch({type:GET_TODOS_ID, payload: todos.data}) 
}
}

export function filterTaskByIdAndStatus(id, status){
  console.log(id, status)
  return async function(dispatch){
    const estado = await axios.get(`http://localhost:3001/todos/${id}/${status}`)
    return dispatch({
      type: UPDATE_TASK,
      payload: estado.data
    })
  }
}


export function updateStatus(id,status){
  return async function(dispatch){
    const estado = await axios.put(`http://localhost:3001/todos/${id}`, status)
    return dispatch({
      type: UPDATE_TASK_STATUS,
      payload: estado.data
    })
  }
}


// import axios from "axios";
// import {
//   CREATE_USER,
//   VALIDATE_USER,
//   DAILY_TASKS,
//   GET_USER,
//   GET_BOSS,
//   GET_TODOS,
//   GET_TODOS_ID
// } from "./ActionTypes";

// export function getUsers(){
//     return async function(dispatch){
//         const users = await axios.get('http://localhost:3001/user')
//         return dispatch({type:GET_USER, payload: users.data})
// }
// }

// export function getToDos(){
//   return async function(dispatch){
//       const todos = await axios.get(`http://localhost:3001/todos`)
//     return dispatch({type:GET_TODOS, payload: todos.data}) 
// }
// }

// export function getToDosById(id){
//   return async function(dispatch){
//       const todos = await axios.get(`http://localhost:3001/todos/${id}`)
//     return dispatch({type:GET_TODOS_ID, payload: todos.data}) 
// }
// }



