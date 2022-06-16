import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginController from "../reusable/LoginController";
import { getUsersById } from "../../redux/actions";

export default function GuardProfile ({show}) {
  const id = localStorage.getItem('id');
  let dispatch = useDispatch();
  let header = LoginController();
  useEffect(()=>{
    dispatch(getUsersById(id, header))
  },[])
  return (
    // <Tasks/>
    <div className={`fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700`}>ESTO ES DE PRUEBAAAAA, SERIA EL HOME DEL WATCHER</div>
  )
}