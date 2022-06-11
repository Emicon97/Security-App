import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom';
import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';
import LoginController from './reusable/LoginController';
import ViewTasksHome from './reusable/ViewTasksHome';
import './styles/Home.css'
import ViewProfileHome from './reusable/ViewProfileHome';
import ViewEmployeesHome from './reusable/ViewEmployeesHome';
import { getUsersById } from '../redux/actions';


export default function Home() {
    let { id } = useParams()
    const header = LoginController()
    
    let user = useSelector(state => state.userDetails)
    let dispatch = useDispatch()


    useEffect(() => {

        dispatch(getUsersById(id, header))

    }, [dispatch])


    if (user[1] === "supervisor" || user[1] === "boss") {

        return (
            <div id='home'>
                <ViewProfileHome user={user[0]}/>
                <ViewTasksHome id={id} header={header}/>
                <ViewEmployeesHome employees={user[0].watcher} id={id} header={header}/>
            </div>
        )

    } else if (user[1] === "watcher") {

        return (
            <div id="home">
                <ViewProfileHome user={user[0]}/>
                <ViewTasksHome id={id} header={header}/>
            </div>
        )
    }
// export default function Home({show}) {
//     //variable para saber el path
//     //me quedo con el string del rol
//     let rolUsuario = localStorage.getItem('user') 
//     let home;
//     switch (rolUsuario) {
//         case "boss":
//             home = <BossProfile show={show} />;
//             break;
//         case "supervisor":
//             home = <HomeSupervisor show={show} />;
//             break;

//         case "guard":
//             home = <GuardProfile show={show} />;
//             break;
        // }

    return home;
    // return (
    //     <ViewTasksHome id={id} header={header} />
    // )
    
}
