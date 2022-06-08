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
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/${userData._id}/profile`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/${userData._id}`}>
                        Empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/${userData._id}`}>
                        Asignar Tareas
                    </Link>
                    {/* <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={'/user/add'}>
                        Añadir empleados
                    </Link> */}
                </li>
                : null
            }
        </>
    )

}