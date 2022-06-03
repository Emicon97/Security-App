import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';

import { getEmployees } from '../redux/actions';

export default function Home () {
    const dispatch = useDispatch();
    const header = useSelector((state) => state.token);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getEmployees(id, {headers:{'auth-token': header}}))
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
    // if (rolUsuario === "boss") {
    //     home = <BossProfile/>
    // } else if (rolUsuario === "supervisor") {
    //     home = <HomeSupervisor/>
    // } else if (rolUsuario) {
    //     home = <GuardProfile/>
    // } else {
    //     home = <h1>No estás registrado</h1>
    // }

    return (        
        home
    )

}