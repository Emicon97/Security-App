import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import BossProfile from './boss/BossProfile';
import GuardProfile from './guard/GuardProfile';
import HomeSupervisor from './supervisor/HomeSupervisor';
import LoginController from '../components/reusable/LoginController'

import { getEmployees } from '../redux/actions';
import { logout } from './../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function Home () {
    const dispatch = useDispatch();
    const header = LoginController();
    const { id } = useParams();
    const token = useSelector(state=>state.token)
    const navigate = useNavigate()
    useEffect(() => {
        if(token.length>1){
            dispatch(getEmployees(id, header))
        }else{
            dispatch(getEmployees(id,{headers:{'auth-token':""}}))
        }
      }, [dispatch]);

    function handleClick(){
        dispatch(logout())
    }

    useEffect(()=>{
        if(!token.length){
        navigate('/login');
        }
    },[token])


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