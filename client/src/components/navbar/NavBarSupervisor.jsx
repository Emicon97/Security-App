import React from "react";
import { Link } from 'react-router-dom'


export default function NavBarSupervisor (userData) {

    return (
        <>
            {
                userData
                ? <li>
                    <Link to={`/supervisor/${userData._id}`}>
                        Dashboard
                    </Link>
                    <Link to={`/user/${userData._id}/profile`}>
                        Perfil
                    </Link>
                    <Link to={`/user/${userData._id}`}>
                        Empleados
                    </Link>
                    <Link to={`/user/${userData._id}`}>
                        Asignar Tareas
                    </Link>
                    <Link to={'/user/add'}>
                        Añadir empleados
                    </Link>
                </li>
                : null
            }
        </>
    )

}