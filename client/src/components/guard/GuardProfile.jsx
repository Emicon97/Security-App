import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getToDosById,
  getUsersById,
  filterTaskByIdAndStatus,
  updateStatus,
} from "../../redux/actions";
import Modal from "../reusable/Modal";
import EditState from "../EditState/EditState"; 
import './styles.css'

export default function GuardProfile() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('')
  const uploadImage = async (e) => {
      const files = e.target.files;
      const data = new FormData();
  
      data.append('file', files[0]);
      data.append('upload_preset', 'magqqp6o');
     
      setLoading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
      const file = await res.json();
      
      setImage(file.secure_url);
      setLoading(false)
  };

  const ToDos = useSelector((state) => state.todosId);
  const user = useSelector((state) => state.userDetails);
  const updatedTask = useSelector((state) => state.todoUpdate);
  const dispatch = useDispatch();
  const { id } = useParams();

    const [active, setActive] = useState(false);
    const [currentState, setCurrentState] = useState("All")

  const toggle = ()=>{
    setActive(!active);
    setImage('')
  }

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
    dispatch(updateStatus(e.target.id, { status: e.target.value }));
  };

  return (
    <div className="screen-tasks">
      


      <div className="contenedor_tareas">
        <div className="head-tasks">
          <Link to={`/EditState/${id}`}><button>Edit</button></Link>
          <h2 className="list-tasks">Lista de tareas</h2>
          <div className="filter">
            <span>Filtrar Tareas: </span>
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
        
        {ToDos?.map((todo, i) => (
          <div key={i} className="tasks">

            <div className="info-task">

            <h3 className="title">{todo.name}</h3>
            {/* <h3><span className="title">title:</span> {todo.name}</h3> */}
            <p className="title">{todo.description} </p>
            {/* <p><span className="title">description:</span> {todo.description}</p> */}
              <button onClick={toggle}>Adjuntar Imagen y Comentario</button>

              <h3><span className="title">title:</span> {todo.name}</h3>
              <p><span className="title">description:</span> {todo.description}</p>

            </div>

            <div className="status-task">
              <p className={`${todo.status} status`} >{todo.status}</p>
              <span className="title-priority"><span className="title">Prioridad:</span> <span className={`${todo.priority} priority`}>{todo.priority}</span></span>

            </div>
          </div>
        ))}
        
      </div>
      <Modal active={active} toggle={toggle}>
        <div style={style.modal}>
          <label>Comentario:</label>
          <textarea className={Input()} placeholder="Comentario sobre la tarea..."></textarea>
            <input className={File} type="file" name="file" onChange={uploadImage}></input>
            {loading ? (<p>...loading</p>) : (<img src={image} style={style.img}/>)}
            <button onClick={()=>setImage('')}>x</button>
          <button className={Button()}>Enviar</button>
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
