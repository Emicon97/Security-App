import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';
import LoginController from '../components/reusable/LoginController'

import { getEmployees } from '../redux/actions';
import Logout from './Logout';

export default function Home () {
    const dispatch = useDispatch();
    const header = LoginController();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getEmployees(id, header))
      }, [dispatch]);

    //variable para saber el path
    let prueba = useLocation()
    //me quedo con el string del rol
    let rolUsuario = prueba.pathname.split("/")[1];
    let home;
    switch (rolUsuario) {
        case "boss": 
            home = <BossProfile/>;
            break;

        case "supervisor": 
            home = <HomeSupervisor/>;
            break;

        case "watcher": 
            home = <GuardProfile/>;
            break;

        default: 
            home = <h1>No estás registrado</h1>;
            break;
    }

    return (  
        <div>
            {home}
            <Logout/>
        </div>      
    )

}