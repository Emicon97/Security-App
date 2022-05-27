import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getToDos } from "../redux/actions";

export default function PerfilGuardia() {
const dispatch = useDispatch();
const todos = useSelector(state=>state.todos);
// const todosId = useSelector(state=>state.todosId);
const {id} = useParams();


useEffect(()=>{
    dispatch(getToDos())
},[dispatch])


    const filtrado = todos.filter(e=>e.watcher === id)

    const [state, setState]= useState({pendientes:filtrado, realizadas:[],postergadas:[]})

    const handleFinished = (e)=>{
        e.preventDefault();

    }
    const handlePostpond = (e)=>{
        e.preventDefault();

    }

    return (
        <>
        {console.log(filtrado)}
        <h1>hola</h1>
        <select >
            <option disabled selected>Filtrar por Estado</option>
            <option value="pending">Pendiente</option>
            <option value="finished">Realizada</option>
            <option value="postpond">Postergada</option>
        </select>

        <div>
            <label>Descripcion de tareas:</label>
            {
                state.pendientes?.map((e,i)=>{
                    return (
                        <div key={i}>
                            <span>{e.description}</span>
                            <button onClick={handleFinished}>Realizada</button>
                            <button onClick={handlePostpond}>Postergada</button>
                        </div>
                        
                    )
                })
            }
        </div>
        </>
    )
} 