import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getToDosById,
  filterByPriority,
  filterByStatus,
  filterByStatusAndPriority,
  updateStatus,
} from "../../redux/actions";
import Modal from "./Modal";
import { container } from '../styles/EditState';
import { Primary } from '../styles/Buttons'

export default function EditState() {
  const ToDos = useSelector((state) => state.todosId);
  const updatedTask = useSelector((state) => state.todoUpdate);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [ currentPriority, setCurrentPriority ] = useState("all");
  const [ currentStatus, setCurrentStatus ] = useState("all");

  const [ active, setActive ] = useState(false);
  const toggle = ()=>{
    setActive(!active);
    setImage('')
  }
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('')
  const uploadImage = async (e) => {
      const files = e.target.files;
      const data = new FormData();
  
      data.append('file', files[0]);
      data.append('upload_preset', 'magqqp6o');
     console.log(files[0])
      setLoading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
      const file = await res.json();
      
      setImage(file.secure_url);
      setLoading(false)
  };

  useEffect(() => {
    dispatch(getToDosById(id));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (currentPriority === "all" && currentStatus !== "all") {
      dispatch(filterByStatus(id, currentStatus));
    } else if (currentPriority !== "all" && currentStatus !== "all") {
      dispatch(filterByStatusAndPriority(id, currentStatus, currentPriority));
    } else if (currentPriority !== "all" && currentStatus === "all") {
      dispatch(filterByPriority(id, currentPriority));
    } else {
      dispatch(getToDosById(id));
    }
    setCurrentStatus(currentStatus);
    // eslint-disable-next-line
  }, [updatedTask]);

  const priorityManager = (e) => {
    let priority = e.target.value;
    if (priority === "all" && currentStatus !== "all") {
      dispatch(filterByStatus(id, currentStatus));
    } else if (priority !== "all" && currentStatus !== "all") {
      dispatch(filterByStatusAndPriority(id, currentStatus, priority));
    } else if (priority !== "all" && currentStatus === "all") {
      dispatch(filterByPriority(id, priority));
    } else {
      dispatch(getToDosById(id));
    }
    setCurrentPriority(priority);
  };

  const statusManager = (e) => {
    let status = e.target.value;
    if (currentPriority === "all" && status !== "all") {
      dispatch(filterByStatus(id, status));
    } else if (currentPriority !== "all" && status !== "all") {
      dispatch(filterByStatusAndPriority(id, status, currentPriority));
    } else if (currentPriority !== "all" && status === "all") {
      dispatch(filterByPriority(id, currentPriority));
    } else {
      dispatch(getToDosById(id));
    }
    setCurrentStatus(status);
  };

  const updateTaskStatus = (e) => {
    dispatch(updateStatus(e.target.id, { status: e.target.value }));
  };

  return (
    <div className={container}>
      <nav className="flex justify-between text-base gap-3 mr-3 pt-3 text-gray-500">
        <Link to={`/guard/${id}`} className="flex">
          <button className={`${Primary()} ml-3`}>
            <h2>Go Back</h2>
          </button>
        </Link>
        <div className="priorityFilter">
            <select onChange={(e) => priorityManager(e)}>
            <option value="0" hidden>Filter by priority</option>
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="regular">Regular</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="statusFilter">
            <select onChange={(e) => statusManager(e)}>
            <option value="0" hidden>Filter by status</option>
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="left">Left</option>
              <option value="postponed">Postponed</option>
            </select>
          </div>
      </nav>

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
              <span>Prioridad: </span>
              <span>{todo.priority}</span>
              <button onClick={toggle} className="rounded-lg border-solid border-2 border-inherit ml-2 hover:bg-cyan-200">
                Adjuntar Imagen y Comentario
              </button>
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
                    className="rounded-lg border-solid border-2 border-inherit mr-2 bg-gray-200 text-gray-500 active:bg-gray-200"
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
                <p className="bg-[#D8F7E6] text-[#006D64] px-2 py-0.5 rounded-lg text-lg shadow-lg min-w-[5em] text-center">
                  {todo.status}
                </p>
              ) : todo.status === "postponed" ? (
                <p className="bg-[#FFEFE4] text-[#EF5F0A] p-1 rounded-lg text-lg shadow-lg min-w-[5em] text-center">
                  {todo.status}
                </p>
              ) : (
                <p className="bg-[#FFE5E8] text-[#DB041A] p-1 rounded-lg text-lg shadow-lg min-w-[5em] text-center">
                  {todo.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal active={active} toggle={toggle}>
        <div style={style.modal}>
          <label>Your comment:</label>
          <textarea className={Input()} placeholder="Comentario sobre la tarea..."></textarea>
            <input className={File} type="file" name="file" onChange={uploadImage}></input>
            {loading ? (<p>...Loading</p>) : (<img src={image} alt="Nothing has been uploaded." style={style.img}/>)}
          <button className={Button()}>Send</button>
        </div>
      </Modal>
    </div>
  );
}

const style = {
  modal: {
    display:'flex',
    flexDirection: 'column',
    margin: '5px'
  },
  img: {
    width :'100px',
    heigth: '100px'
  }
}

const Input = (props) => `
    hover:bg-slate-100
    placeholder:italic placeholder:text-slate-400 
    block bg-white w-${props === 'Select' ? '32' : '96'} m-2.5
    border border-slate-300 rounded-md 
    py-2 pl-9 pr-3 shadow-sm 
    focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
    sm:text-sm
`;

const Button = () => `
    font-bold text-white
    bg-blue-500
    w-32 h-10 p-0 mt-3
    border-2 border-blue-500
    hover:border-blue-600 hover:bg-blue-600
    active:border-blue-700 active:bg-blue-700
    rounded-3xl
`;

const File = `
    block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
`;