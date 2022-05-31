import axios from "axios";
import {
  GET_USER_ID,
  GET_TODOS,
  GET_TODOS_ID,
  UPDATE_TASK_STATUS
} from "./ActionTypes";

export function getUsersById(id){
    return async function(dispatch){
        const users = await axios.get(`http://localhost:3001/user/${id}`);
        return dispatch({
          type:GET_USER_ID,
          payload: users.data
        });
}
}

export function getToDos(){
  return async function(dispatch){
      const todos = await axios.get(`http://localhost:3001/todos`);
    return dispatch({
      type:GET_TODOS,
      payload: todos.data
    });
}
}

export function getToDosById(id){
  return async function(dispatch){
      const todos = await axios.get(`http://localhost:3001/todos/${id}`);
    return dispatch({
      type: GET_TODOS_ID,
      payload: todos.data
    });
  }
}

export function updateStatus(id,status){
  return async function(dispatch){
    const state = await axios.put(`http://localhost:3001/todos/${id}`, status)
    return dispatch({
      type: UPDATE_TASK_STATUS,
      payload: state.data
    })
  }
}

export function filterByPriority(id,priority){
  return async function(dispatch){
    const state = await axios.get(`http://localhost:3001/todos/${id}/?priority=${priority}`)
    return dispatch({
      type: GET_TODOS_ID,
      payload: state.data
    });
  }
}

export function filterByStatus(id, status){
  return async function(dispatch){
    const state = await axios.get(`http://localhost:3001/todos/${id}/${status}`);
    return dispatch({
      type: GET_TODOS_ID,
      payload: state.data
    });
  }
}

export function filterByStatusAndPriority(id,status,priority){
  return async function(dispatch){
    const state = await axios.get(`http://localhost:3001/todos/${id}/${status}/?priority=${priority}`)
    return dispatch({
      type: GET_TODOS_ID,
      payload: state.data
    })
  }
}
