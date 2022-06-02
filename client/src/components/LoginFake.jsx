import React from 'react';
import { useEffect } from 'react';
import { loginPrueba } from '../redux/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function LoginFake(){
    const dispatch = useDispatch()
    const userdata = useSelector((state)=>state.userData)
    const [input,setInput] = useState({
        dni:"",
        password:""
    })
    useEffect(()=>{
        dispatch(loginPrueba({dni:14000,password:"abc123"}))
    },[userdata])
    console.log(userdata)
    return(
        <div>
            <form>
                <label htmlFor="">dni:<input type="number" value={input.dni} name="dni"/></label>
                <label htmlFor="">password: <input type="text" value={input.password} name="password"/></label>
            </form>
        </div>
        )
}