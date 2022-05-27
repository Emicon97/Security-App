import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"


export default function GuardProfile () {

    let tasks = useSelector(state => state.allTasks)

    //datos de prueba
    let guards = {
        name: "Juan",
        lastname: "Jhonson",
        zona: "torres gemelas, tucuman",
        tasks: [
            {title: "mirar tiktoks", completed: false},
            {title: "leer un libro", completed: false},
            {title: "vigilar la entrada", completed: false},
            {title: "mirar camaras", completed: false},
            {title: "revisar los alrededores", completed: false},
        ]
    }

    //creo un estado, como el valor inicial es un obj con todas las tareas y las filtradas
    // let [tasks, setTasks] = useState({filteredTasks: guards.tasks, allTasks: guards.tasks})

    //function que le paso a los input radio, verifico si filtro tareas por pendientes, completadas o todas
    // let handleFilteredTasks = (event) => {
    //     let filtered
    //     if(event.target.value === "pending") {
    //         filtered = tasks.allTasks.filter(e => !e.completed);
    //         setTasks({...tasks, filteredTasks: filtered});
    //     } else if (event.target.value === "completed") {
    //         filtered = tasks.allTasks.filter(e => e.completed);
    //         setTasks({...tasks, filteredTasks: filtered});    
    //     }
    //     else {
    //         setTasks({...tasks, filteredTasks: tasks.allTasks})
    //     }
    // }

    //function que le paso al checkbox para cambiar el estado de esa tarea (pending o completed)
    // let handleCompletedTask = (event) => {
    //     tasks.filteredTasks[event.target.value].completed = !tasks.filteredTasks[event.target.value].completed
    // }


    return (
        <div className="guard-profile">

            <div className="img-profile">
                <img src="https://i.pinimg.com/236x/f0/e8/1d/f0e81d73918c34b90c5639fdba2f75af.jpg" alt="" />
            </div>

            <div className="info-profile">

                <h2>{guards.name} {guards.lastname}</h2>
                <p>Zona de vigilancia: {guards.zona}</p>
    
                {/* <label>
                    <input type="radio" name="tasks" defaultChecked={true} onClick={handleFilteredTasks}/>
                    tareas asignadas
                </label>
                <label>
                    <input type="radio" name="tasks" value="pending" onClick={handleFilteredTasks}/>
                    tareas pendientes
                </label>
                <label>
                    <input type="radio" name="tasks" value="completed" onClick={handleFilteredTasks}/>
                    tareas realizadas
                </label> */}

                {
                    //si hay tareas filtradas las renderizo, sino, renderizo un h3
                    tasks.length > 0 
                    ? <ul>
                        {
                            tasks.map((e, i) => (
                                <li key={i}>
                                    {e}
                                    {/* todas las tareas tienen su propio checkbox que se inicializa segun su estado */}
                                    {/* <input type="checkbox" id="cbox1" defaultChecked={e.completed ? true : false} value={i} onClick={handleCompletedTask}/> */}
                                </li>
                            ))
                        }
                    </ul>
                    : <h3>No tiene tareas asignadas</h3>
                }

            </div>

        </div>
    )

} 