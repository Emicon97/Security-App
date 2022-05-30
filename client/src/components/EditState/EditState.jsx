import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

  const [currentState, setCurrentState] = useState("all");

  useEffect(() => {
    dispatch(getUsersById(id));
    dispatch(getToDosById(id));
  }, [dispatch]);

  useEffect(() => {
    if (currentState !== "all") {
      console.log(currentState);
      dispatch(filterTaskByIdAndStatus(id, currentState));
    } else {
      dispatch(getToDosById(id));
    }
  }, [updatedTask]);

  const tareas = (e) => {
    e.preventDefault();
    dispatch(filterTaskByIdAndStatus(id, e.target.value));
    setCurrentState(e.target.value);
  };

  const updateTaskStatus = (e) => {
    dispatch(updateStatus(e.target.id, { status: e.target.value }));
  };

  return (
    <div className="flex-column bg-[#EDF6FE] m-auto w-4/5 mt-6">
      <div className="flex justify-between text-base gap-3 mr-3 text-gray-500">
        <Link to={`/guard/${id}`} className="flex">
          <button className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200 ml-3">
            <h2>Go Back</h2>
          </button>
        </Link>
        <div className="flex gap-3">
          <span className="mt-3">Filtrar Tareas: </span>
          <select onChange={(e) => tareas(e)}>
            <option disabled defaultValue>
              Seleccionar estado de tarea
            </option>
            <option value="done">Realizadas</option>
            <option value="left">Pendientes</option>
            <option value="postponed">Postergadas</option>
          </select>
        </div>
      </div>

      <h2 className="flex justify-center text-xl text-gray-500">
        Lista de tareas:{" "}
      </h2>
      <div className="flex flex-wrap gap-7 w-4/5 mx-20">
        {ToDos?.map((todo, i) => (
          <div className="max-w-sm w-full lg:max-w-full lg:flex justify-between border-solid border-2 border-inherit rounded-2xl justify-center items-center px-7 py-3 gap-3 shadow-lg">
            <div key={i}>
              <h3>
                {" "}
                <span className="text-gray-500 text-lg font-bold">
                  Titulo:
                </span>{" "}
                {todo.name}
              </h3>
              <p>
                {" "}
                <span className="text-gray-500 text-lg font-bold">
                  Descripcion:
                </span>{" "}
                {todo.description}
              </p>
              <span>Prioridad:  </span>
              <span>{todo.priority}</span>
              <button  className="rounded-lg border-solid border-2 border-inherit ml-2 hover:bg-cyan-200">Adjuntar Imagen y Comentario</button>
              {/* {beenClicked===1?<p>vuelva a presinar el boton para confirmar</p>:null} */}
              <div className="mt-3">
                <button
                  className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200"
                  value="done"
                  id={todo._id}
                  onClick={(e) => updateTaskStatus(e)}
                >
                  Terminado
                </button>
                {todo.status === "done" ? (
                  <button
                    disabled
                    className="rounded-lg border-solid border-2 border-inherit mr-2 bg-gray-200 text-gray-500"
                  >
                    Postergar
                  </button>
                ) : (
                  <button
                    className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200"
                    value="postponed"
                    id={todo._id}
                    onClick={(e) => updateTaskStatus(e)}
                  >
                    Postergar
                  </button>
                )}
              </div>
            </div>
            <div>
              {todo.status === "done" ? (
                <p className="bg-[#D8F7E6] text-[#006D64] px-2 py-0.5 rounded-lg text-lg shadow-lg">
                  {todo.status}
                </p>
              ) : todo.status === "postponed" ? (
                <p className="bg-[#FFEFE4] text-[#EF5F0A] p-1 rounded-lg text-lg shadow-lg">
                  {todo.status}
                </p>
              ) : (
                <p className="bg-[#FFE5E8] text-[#DB041A] p-1 rounded-lg text-lg shadow-lg">
                  {todo.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
