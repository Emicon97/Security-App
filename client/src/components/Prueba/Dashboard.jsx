import React, { useState } from 'react';
import './Dashboard.css'

export default function Dashboard () {

    // let [usersData, serUse] =
    let [usersData, setUsersData] = useState([]);

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => setUsersData(data))
    



    return (
        <div className="dash-container">
            <div className="top-container">
                <div className="input">
                    <input type="text" className='input' placeholder='Buscar empleados o tareas'/>
                    <p>P</p>
                </div>
                <div className="img-profile">
                    <div className="img-prueba">
                        <img src="https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png" alt="" />
                    </div>
                    <h3>Supervisor Martinez</h3>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div className="tasks">
                <h3>Tareas</h3>                
                    <div className="tasks-list">
                        <div className="item-task-list">
                            <div className="img-task"></div>
                            <div className="details">
                                <h4>Titulo de la tarea</h4>
                                <p>Detalles de la tarea</p>
                            </div>
                        </div>
                        <div className="item-task-list">
                            <div className="img-task"></div>
                            <div className="details">
                                <h4>Titulo de la tarea</h4>
                                <p>Detalles de la tarea</p>
                            </div>
                        </div>
                        <div className="item-task-list">
                            <div className="img-task"></div>
                            <div className="details">
                                <h4>Titulo de la tarea</h4>
                                <p>Detalles de la tarea</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="employees-zone">
                <h3>Empleados</h3>
                <div className="employees-details">
                    
                    {
                        usersData.length
                        ? usersData.map(employee => (
                            <div className="card-employees">
                                <h4 className="employees-num-tasks">+5</h4>
                                <div className="employees-environment">
                                    <h4>{employee.address.city}</h4>
                                    <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                                </div>
                                <div className="employee-profile">
                                    <div className="img-profile-employee">
                                        {/* <img src="https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png" alt="" /> */}
                                        <img src="https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_guard_people_person_profile_user_icon_123372.png" alt="" />
                                    </div>
                                    <h4 className="name-employee">{employee.name}</h4>
                                </div>
                            </div>
                        ))
                        : <h3>No tienes empleados</h3>
                    }
                    {/* <div className="card-employees">
                        <h4 className="employees-num-tasks">5</h4>
                        <div className="employees-environment">
                            <h4>Lugar de trabajo</h4>
                            <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                        </div>
                        <div className="employee-profile">
                            <div className="img-profile-employee"></div>
                            <h4 className="name-employee">Pepe Guardia</h4>
                        </div>
                    </div>
                    
                    <div className="card-employees">
                        <h4 className="employees-num-tasks">5</h4>
                        <div className="employees-environment">
                            <h4>Lugar de trabajo</h4>
                            <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                        </div>
                        <div className="employee-profile">
                            <div className="img-profile-employee"></div>
                            <h4 className="name-employee">Pepe Guardia</h4>
                        </div>
                    </div>

                    <div className="card-employees">
                        <h4 className="employees-num-tasks">5</h4>
                        <div className="employees-environment">
                            <h4>Lugar de trabajo</h4>
                            <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                        </div>
                        <div className="employee-profile">
                            <div className="img-profile-employee"></div>
                            <h4 className="name-employee">Pepe Guardia</h4>
                        </div>
                    </div>

                    <div className="card-employees">
                        <h4 className="employees-num-tasks">5</h4>
                        <div className="employees-environment">
                            <h4>Lugar de trabajo</h4>
                            <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                        </div>
                        <div className="employee-profile">
                            <div className="img-profile-employee"></div>
                            <h4 className="name-employee">Pepe Guardia</h4>
                        </div>
                    </div>

                    <div className="card-employees">
                        <h4 className="employees-num-tasks">5</h4>
                        <div className="employees-environment">
                            <h4>Lugar de trabajo</h4>
                            <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                        </div>
                        <div className="employee-profile">
                            <div className="img-profile-employee"></div>
                            <h4 className="name-employee">Pepe Guardia</h4>
                        </div>
                    </div>

                    <div className="card-employees">
                        <h4 className="employees-num-tasks">5</h4>
                        <div className="employees-environment">
                            <h4>Lugar de trabajo</h4>
                            <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                        </div>
                        <div className="employee-profile">
                            <div className="img-profile-employee"></div>
                            <h4 className="name-employee">Pepe Guardia</h4>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>
    )

}