import React from "react";
import { Link } from 'react-router-dom'


export default function NavBarSupervisor ({userData}) {

    return (
        <>
            {
                userData
                ? <li className="flex items-center gap-2.5">
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData._id}`}>
                        Dashboard
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/profile/${userData._id}`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/employees/${userData._id}`}>
                        Empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/createTask/${userData._id}`}>
                        Asignar Tareas
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/add/${userData._id}`}>
                        Añadir empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/tasks/${userData._id}`}>
                        Ver Tareas
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/prueba/supervisor/${userData._id}`}>
                        PRUEBA
                    </Link>
                </li>
                : null
            }
        </>
    )

}