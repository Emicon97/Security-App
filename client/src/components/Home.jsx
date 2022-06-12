import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom';
import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';
import LoginController from './reusable/LoginController';
import ViewTasksHome from './reusable/ViewTasksHome';
// import './styles/Home.css'
import ViewProfileHome from './reusable/ViewProfileHome';
import ViewEmployeesHome from './reusable/ViewEmployeesHome';
import { getUsersById } from '../redux/actions';

export default function Home({show}) {
    //variable para saber el path
    //me quedo con el string del rol
    let id = localStorage.getItem('id')
    let rolUsuario = localStorage.getItem('user') 
    let header = LoginController();
    
    let user = useSelector(state => state.userDetails)
    let dispatch = useDispatch()


    useEffect(() => {

        dispatch(getUsersById(id, header))

    }, [dispatch])

    if (user.length) {
        if (rolUsuario === "boss") {
            return (
                <div id='home' className={`fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700 overflow-auto`}>
                    <ViewProfileHome user={user[0]}/>
                    <ViewEmployeesHome employees={user[0].watcher} id={id} header={header}/>
                </div>
            )
        } else if (rolUsuario === "supervisor") {
            return (
                <div id='home' className={`fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700 overflow-auto`}>
                    <ViewProfileHome user={user[0]}/>
                    <ViewTasksHome id={id} header={header}/>
                    <ViewEmployeesHome employees={user[0].watcher} id={id} header={header}/>
                </div>
            )
        } else if (rolUsuario === "watcher") {
    
            return (
                <div id="home" className={`fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700 overflow-auto`}>
                    <ViewProfileHome user={user[0]}/>
                    <ViewTasksHome id={id} header={header}/>
                </div>
            )
        } else {
            return (
                <h3>Cargando...</h3>
            )
        }

    } else {
        return (
            <h3>Cargando...</h3>
        )
    }










}
//===================================
//ASI ESTABA EL COMPONENTE
//===================================

// export default function Home({show}) {
    
    // let rolUsuario = localStorage.getItem('user') 
    // let home;
//     let dispatch = useDispatch()
    
//      let rolUsuario = localStorage.getItem('user')

    // switch (rolUsuario) {
    //     case "boss":
    //         home = <BossProfile show={show} />;
    //         break;
    //     case "supervisor":
    //         home = <HomeSupervisor show={show} />;
    //         break;

    //     case "guard":
    //         home = <GuardProfile show={show} />;
    //         break;

    //     default:
    //         home = <h1>No estás registrado</h1>;
    //         break;
    // }
    // return home;
    // return (
    //     <ViewTasksHome id={id} header={header} />
    // )
// }

//===================================
//EL COMPONENTE QUE HICE YO
//===================================

// export default function Home() {
//     let { id } = useParams()
//     const header = LoginController()
    
//     let user = useSelector(state => state.userDetails)
//     let dispatch = useDispatch()


//     useEffect(() => {

//         dispatch(getUsersById(id, header))

//     }, [dispatch])


//     if (user[1] === "supervisor" || user[1] === "boss") {

//         return (
//             <div id='home'>
//                 <ViewProfileHome user={user[0]}/>
//                 <ViewTasksHome id={id} header={header}/>
//                 <ViewEmployeesHome employees={user[0].watcher} id={id} header={header}/>
//             </div>
//         )

//     } else if (user[1] === "watcher") {

//         return (
//             <div id="home">
//                 <ViewProfileHome user={user[0]}/>
//                 <ViewTasksHome id={id} header={header}/>
//             </div>
//         )
//     }
    
// }
