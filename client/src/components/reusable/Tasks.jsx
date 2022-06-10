import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import './../styles/reusable/Tasks.css'
import {
  getToDosById,
  filterByPriority,
  filterByStatus,
  filterByStatusAndPriority,
} from "../../redux/actions";
import Modal from "../reusable/Modal";
import { Tertiary, Input } from '../styles/Buttons'
import LoginController from "./LoginController";

//animations
import aos from "aos";
import 'aos/dist/aos.css'

export default function Tasks() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "magqqp6o");

    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  const ToDos = useSelector((state) => state.todosId);
  const todosPriority = ToDos.map(m => m.priority)
  const todosUrgent = todosPriority.filter(f => f === 'urgent')
  const todosHigh = todosPriority.filter(f => f === 'high')
  const todosRegular = todosPriority.filter(f => f === 'regular')
  const todosStatus = ToDos.map(r => r.status)
  const todosDone = todosStatus.filter(r => r === 'done')
  const todosLeft = todosStatus.filter(r => r === 'left')
  const updatedTask = useSelector((state) => state.todosId);
  const dispatch = useDispatch();
  const { id } = useParams();
  const header = LoginController();
  const [active, setActive] = useState(false);
  const [currentPriority, setCurrentPriority] = useState("all");
  const [currentStatus, setCurrentStatus] = useState("all");

  const toggle = () => {
    setActive(!active);
    setImage("");
  };


  useEffect(() => {
    dispatch(getToDosById(id, header));
    // eslint-disable-next-line
    aos.init({duration: 700})
  }, [dispatch]);

  // useEffect(() => {
  //   // eslint-disable-next-line
  // }, [updatedTask]);

  const priorityManager = (e) => {
    let priority = e.target.value;
    if (priority === "all" && currentStatus !== "all") {
      dispatch(filterByStatus(id, currentStatus, header));
    } else if (priority !== "all" && currentStatus !== "all") {
      dispatch(filterByStatusAndPriority(id, currentStatus, priority, header));
    } else if (priority !== "all" && currentStatus === "all") {
      dispatch(filterByPriority(id, priority, header));
    } else {
      dispatch(getToDosById(id, header));
    }
    setCurrentPriority(priority);
  };

  // const notificationColor=()=>{
  //   if(ToDos.filter(f=>f.status==="left")){

  //   }
  // }

  const statusManager = (e) => {
    let status = e.target.value;
    if (currentPriority === "all" && status !== "all") {
      dispatch(filterByStatus(id, status, header));
    } else if (currentPriority !== "all" && status !== "all") {
      dispatch(filterByStatusAndPriority(id, status, currentPriority, header));
    } else if (currentPriority !== "all" && status === "all") {
      dispatch(filterByPriority(id, currentPriority, header));
    } else {
      dispatch(getToDosById(id, header));
    }
    setCurrentStatus(status);
  };

  return (
    <div className="screen-tasks-container">

      {/* SCREEN */}
      <div className="h-full flex flex-col justify-center items-center screen-tasks">

        {/* HEAD */}
        <div className="head-tasks w-10/12 flex justify-around items-center mb-2">
          <h1 className="text-2xl text-[#0243EC] title-tasks">Things to do</h1>
          <div className="flex items-center">
            {
              todosDone.length ? 
              <p className="h-4 w-4 bg-green-500 rounded-full"></p> : 
              todosLeft.length ? 
              <p className="h-4 w-4 bg-red-500 rounded-full"></p> : 
              <p className="h-4 w-4 bg-orange-500 rounded-full"></p> 
            }
            <select onChange={(e) => statusManager(e)} className={Input('Select')}>
              <option value="0" hidden>Status</option>
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="left">Left</option>
              <option value="postponed">Postponed</option>
            </select>
          </div>
          <div className="flex items-center">
            {
              todosUrgent.length ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#E8132A">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg> :
              todosHigh.length ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FA5C00">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg> :
              todosRegular.length ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="green">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#1062FF">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            }
            <select onChange={(e) => priorityManager(e)} className={Input('Select')}>
              <option value="0" hidden>Priority</option>
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="regular">Regular</option>
              <option value="low">Low</option>
            </select>
          </div>
          <Link to={`/EditState/${id}`}>
            <button className={Tertiary}>Edit</button>
          </Link>
        </div>


        {/* TODOS */}
        {
          ToDos?.map((todo, i) => (
            <div key={i}
              data-aos="zoom-in"
              className={`todo-tasks
              ${todo.priority === 'urgent' ? 
              'bg-[#FFE5E8] hover:bg-[#ffd5da]' : 
              todo.priority === 'high' ? 
              'bg-[#FFEFE4] hover:bg-[#ffe2cf]' : 
              todo.priority === 'regular' ? 
              'bg-[#ebffe5] hover:bg-[#d4ffc7]' : 
              'bg-[#E8F1FF] hover:bg-[#cfe2ff]'}
              flex w-10/12 rounded-2xl mb-2`}
              onClick={toggle}
            >
              <div className="w-full m-2.5 flex flex-col relative">
                <div className="w-auto flex items-center">
                  {
                    todo.priority === 'urgent' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#E8132A">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />                    
                    </svg> : 
                    todo.priority === 'high' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FA5C00">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg> : 
                    todo.priority === 'regular' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="green">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#1062FF">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  }
                  <h4 className="italic ml-1 text-xs mt-0.5">Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</h4>
                  <h1 className="w-auto ml-1.5 truncate text-base font-medium">{todo.name.charAt(0).toUpperCase() + todo.name.slice(1)}</h1>
                </div>
                <p className="w-auto text-sm mt-1 font-normal ml-23px leading-relaxed">{todo.description ? todo.description : 'No description'}</p>
                <span className="flex items-center gap-1.5 absolute top-0.5 right-0.5 italic">{todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                  <p 
                    className={`
                    ${todo.status === 'done' ? 
                    'h-4 w-4 bg-green-500' : 
                    todo.status === 'left' ? 
                    'h-4 w-4 bg-red-500' : 
                    'h-4 w-4 bg-orange-500'} 
                    rounded-full`}>
                  </p>
                </span>

              </div>
            </div>
          ))
        }


      </div>


      <Modal active={active} toggle={toggle}>
        <div style={style.modal}>
          <label>Your comment:</label>
          <textarea
            className={Input()}
            placeholder="Comentario sobre la tarea..."
          ></textarea>
          <input
            className={File}
            type="file"
            name="file"
            onChange={uploadImage}
          ></input>
          {loading ? (
            <p className="loading">...Loading</p>
          ) : (
            image 
            ? <img
                className="img-cloud"
                src={image}
                alt="Nothing has been uploaded."
                style={style.img}
            /> : null
          )}
          <button className={Button()}>Send</button>
        </div>
      </Modal>
    </div>
  );
}

const style = {
  modal: {
    display: "flex",
    flexDirection: "column",
    margin: "5px",
  },
  img: {
    width: "100px",
    heigth: "100px",
  },
};

// const Input = (props) => `
//     hover:bg-slate-100
//     placeholder:italic placeholder:text-slate-400 
//     block bg-white w-${props === "Select" ? "32" : "96"} m-2.5
//     border border-slate-300 rounded-md 
//     py-2 pl-9 pr-3 shadow-sm 
//     focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
//     sm:text-sm
// `;

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

