import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUsersById } from '../../redux/actions'

export default function NavBarBoss (props) {
    
    return (
        <>
            {
                props 
                ? <li className='flex items-center'>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss/${props}`}>
                        Dashboard
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss/profile/${props}`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss//employees/${props}`}>
                        Empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss/createTask/${props}`}>
                        Asignar Tareas
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss/add/${props}`}>
                        Añadir empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss/tasks/${props}`}>
                        Ver Tareas
                    </Link>
                </li>
                : null
            }
        </>
    )

}