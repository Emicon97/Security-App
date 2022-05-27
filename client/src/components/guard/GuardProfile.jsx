import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getToDosById,
  getUsersById,
  updateTask,
  updateStatus,
} from "../../redux/actions";

export default function GuardProfile() {
  const ToDos = useSelector((state) => state.todosId);
  const user = useSelector((state) => state.userDetails);
  const updateTask = useSelector((state) => state.todoUpdate);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUsersById(id));
    dispatch(getToDosById(id));
  }, [dispatch]);

  useEffect(() => {
    console.log("hola");
    dispatch(getToDosById(id));
  }, [updateTask]);

  console.log(updateTask);
  console.log(user);

  const tareas = (e) => {
    dispatch(updateTask(e.target.value, id));
  };

  const updateTaskStatus = (e) => {
    console.log(e.target.value, "hoaaaaaaa");
    dispatch(updateStatus(e.target.id, { status: e.target.value }));
  };

  return (
    <div className="hola">
      <span>Filtrar Tareas: </span>
      <select onChange={(e) => tareas(e)}>
        <option disabled defaultValue>
          Seleccionar estado de tarea
        </option>
        <option value="done">Realizadas</option>
        <option value="left">Pendientes</option>
        <option value="postponed">Postergadas</option>
      </select>


      <div className="contenedor_tareas">
        <h2>Lista de tareas: </h2>
        {ToDos?.map((todo, i) => (
          <div key={i}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <span>Prioridad: </span>
            <span>{todo.priority}</span>
            <button>Adjuntar Imagen y Comentario</button>
            <p>{todo.status}</p>
            <button
              value="done"
              id={todo._id}
              onClick={(e) => updateTaskStatus(e)}
            >
              Terminado
            </button>
            {todo.status === "done" ? (
              <button disabled>Postergar</button>
            ) : (
              <button
                value="postponed"
                id={todo._id}
                onClick={(e) => updateTaskStatus(e)}
              >
                Postergar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
