import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { Div } from "./Styled";
import {
  getToDosById,
  getUsersById,
  filterTaskByIdAndStatus,
  updateStatus,
} from "../../redux/actions";

export default function EditState() {
  const ToDos = useSelector((state) => state.todosId);
  const user = useSelector((state) => state.userDetails);
  const updatedTask = useSelector((state) => state.todoUpdate);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [currentState, setCurrentState] = useState("All")

  useEffect(() => {
    dispatch(getUsersById(id));
    dispatch(getToDosById(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getToDosById(id));
    if(currentState !== "All"){
      dispatch(filterTaskByIdAndStatus(id,currentState))
  }

}, [updatedTask]);

  const tareas = (e) => {
    dispatch(filterTaskByIdAndStatus( id, e.target.value,));
    setCurrentState(e.target.value)
  };

  const updateTaskStatus = (e) => {
    dispatch(updateStatus(e.target.id, { status: e.target.value}));
  };

  
  return (
      <div className="hola">
      <Link to={`/GuardProfile/${id}`}><button><h2>Go Back</h2></button></Link>
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
            {/* {beenClicked===1?<p>vuelva a presinar el boton para confirmar</p>:null} */}
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
