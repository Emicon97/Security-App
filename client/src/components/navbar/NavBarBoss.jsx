import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUsersById } from '../../redux/actions'

export default function NavBarBoss ({userData}) {

    return (
        <>
            {
                userData 
                ? <li className='flex items-center'>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/boss/${userData._id}`}>
                        Dashboard
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/${userData._id}/profile`}>
                        Perfil
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/${userData._id}`}>
                        Empleados
                    </Link>
                    <Link className="p-2.5 hover:text-[#0243EC] focus:text-[#0243EC]" to={`/user/add`}>
                        Añadir empleados
                    </Link>
                </li>
                : null
            }
        </>
    )

}