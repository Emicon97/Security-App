import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginController from './reusable/LoginController';
import ViewTasksHome from './reusable/ViewTasksHome';
// import './styles/Home.css'
import ViewProfileHome from './reusable/ViewProfileHome';
import ViewEmployeesHome from './reusable/ViewEmployeesHome';
import { createEnvironment, getUsersById } from '../redux/actions';

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

    useEffect(() =>{
        dispatch(createEnvironment(header))
    },[])

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