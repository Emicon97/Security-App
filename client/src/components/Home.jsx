import { useLocation } from 'react-router-dom';

import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';

export default function Home () {
    //variable para saber el path
    let role = useLocation()
    //me quedo con el string del rol
    let rolUsuario = role.pathname.split("/")[1];
    let home;

    switch (rolUsuario) {
        case "boss": 
            home = <BossProfile/>;
            break;
        case "supervisor": 
            home = <HomeSupervisor/>;
            break;

        case "guard": 
            home = <GuardProfile/>;
            break;

        default: 
            home = <h1>No estás registrado</h1>;
            break;
    }

    return (  
        home
    )

}