import axios from "axios";
import {
  CREATE_USER,
  VALIDATE_USER,
  DAILY_TASKS,
  GET_USER,
  GET_BOSS,
  GET_TODOS,
  GET_TODOS_ID
} from "./ActionTypes";

export function getUsers(){
    return async function(dispatch){
        const users = await axios.get('http://localhost:3001/user')
        return dispatch({type:GET_USER, payload: users.data})
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
    return dispatch({type:GET_TODOS, payload: todos.data}) 
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



