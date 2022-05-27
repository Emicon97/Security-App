import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getToDos, getToDosById } from "../redux/actions";


export default function PerfilGuardia () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const todosId = useSelector(state=>state.todosId);

useEffect(()=>{
    dispatch(getToDos());
    dispatch(getToDosById(id))
},[dispatch])


return (
    <div>
        <h1>Tareas a realizar</h1>
        {console.log(todosId)}
        <select>
            <option>Estado de la tarea</option>
            <option>Realizadas</option>
            <option>Pendientes</option>
            <option>Postergadas</option>
        </select>
    </div>
)

}

