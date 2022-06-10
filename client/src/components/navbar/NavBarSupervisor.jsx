import React from "react";
import { Link } from 'react-router-dom'


export default function NavBarSupervisor ({userData}) {

    return (
        <>
            {
                userData
                ? <li className="flex items-center gap-2.5">
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}`}>
                        Dashboard
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/profile/${userData}`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/employees/${userData}`}>
                        Empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/createTask/${userData}`}>
                        Asignar Tareas
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/add/${userData}`}>
                        Añadir empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/tasks/${userData}`}>
                        Ver Tareas
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/prueba/supervisor/${userData}`}>
                        PRUEBA
                    </Link>
                </li>
                : null
            }
        </>
    )

}