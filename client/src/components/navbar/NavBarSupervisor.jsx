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
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/profile`}>
                        Profile
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/employees`}>
                        Employees
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/add`}>
                        Add Employees
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/supervisor/${userData}/tasks`}>
                        See Tasks
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