import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getToDos} from "../store/actions";

export default function TestActions(){
const users = useSelector(state=>state.users);
const todos = useSelector(state=>state.todos);
const dispatch = useDispatch();

useEffect(()=>{
dispatch(getUsers())
dispatch(getToDos())
},[dispatch])

    return(
        <div>
            <h1>Test data received</h1>
            {console.log(users)}
            {console.log(todos)}
        </div>
    )
}