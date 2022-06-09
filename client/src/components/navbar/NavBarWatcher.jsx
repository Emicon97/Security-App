import React from "react";
import { Link } from 'react-router-dom';

export default function NavBarWatcher ({userData}) {

    return (
        <>
            {
                userData
                ? <li className="flex items-center gap-2.5">
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/${userData._id}`}>
                        Dashboard
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/${userData._id}/profile`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/tasks/${userData._id}`}>
                        Ver Tareas
                    </Link>
                </li>
                : null
            }
        </>
    )

}