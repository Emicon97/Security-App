import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';
import LoginController from './reusable/LoginController';
import ViewTasksHome from './reusable/ViewTasksHome';
// import './styles/Home.css'

export default function Home({show}) {
    //variable para saber el path
    //me quedo con el string del rol
    let rolUsuario = localStorage.getItem('user') 
    let home;
    switch (rolUsuario) {
        case "boss":
            home = <BossProfile show={show} />;
            break;
        case "supervisor":
            home = <HomeSupervisor show={show} />;
            break;

        case "guard":
            home = <GuardProfile show={show} />;
            break;

        default:
            home = <h1>No estás registrado</h1>;
            break;
    }
    return home;
    // return (
    //     <ViewTasksHome id={id} header={header} />
    // )

}
