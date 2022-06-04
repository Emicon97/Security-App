import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from "react-router-dom";

import { headerTest, loginPrueba } from '../redux/actions';

export default function LoginFake(){
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.userData);
    const navigate = useNavigate ();
    const [ input, setInput ] = useState({
        dni:"",
        password:""
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(loginPrueba(input))
        setInput({dni:"",password:""})
    }

    useEffect(() => {
        if (userData[1]) {
            const id = userData[0]._id;
            switch (userData[1]) {
                case 'watcher':
                    return navigate(`/watcher/${id}`);
                case 'supervisor':
                    return navigate(`/supervisor/${id}`);
                case 'boss':
                    return navigate(`/boss/${id}`);
            }
        }
    }, [userData]);
    
    // const redirector = (e) => {
    //     e.preventDefault();
    //     dispatch(loginPrueba({ dni:2400000, password:"1234567" }));
    // };

    return(
        <div className='background-color: black'>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <label htmlFor="">dni:<input type="number" value={input.dni} name="dni" onChange={(e)=>{handleChange(e)}}/></label>
                <label htmlFor="">password: <input type="text" value={input.password} name="password" onChange={(e)=>{handleChange(e)}}/></label>
                <button>BOTÓN</button>
            </form>
        </div>
    )
}