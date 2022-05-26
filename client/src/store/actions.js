import React from "react";
import axios from "axios";
import {
  CREATE_USER,
  VALIDATE_USER,
  DAILY_TASKS,
  GET_USER,
  GET_BOSS,
} from "./ActionTypes";

export function getVideogames(){
    return async function(dispatch){
        const users = await axios.get('http://localhost:3001/user')
        return dispatch({type:GET_USER, payload: users.data})
}
}
