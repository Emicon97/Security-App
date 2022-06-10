import React from "react";
import { Link } from 'react-router-dom';

export default function NavBarWatcher (props) {

    return (
        <>
            {
                props
                ? <li className="flex items-center gap-2.5">
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/${props}`}>
                        Dashboard
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/profile/${props}`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/guard/tasks/${props}`}>
                        Ver Tareas
                    </Link>
                </li>
                : null
            }
        </>
    )

}