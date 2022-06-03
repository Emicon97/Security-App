import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUsersById } from '../../redux/actions'

export default function NavBarBoss ({userData}) {


    
    return (
        <>
            {
                userData 
                ? <li>
                    <Link to={`/boss/${userData._id}`}>
                        Dashboard
                    </Link>
                    <Link to={`/user/${userData._id}/profile`}>
                        Perfil
                    </Link>
                    <Link to={`/user/${userData._id}`}>
                        Empleados
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