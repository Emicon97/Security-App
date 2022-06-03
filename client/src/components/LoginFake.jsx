import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from "react-router-dom";

import { loginPrueba } from '../redux/actions';

export default function LoginFake(){
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.userData);
    const navigate = useNavigate ();
    const [ input, setInput ] = useState({
        dni:"",
        password:""
    });

    useEffect(() => {
        if (userData[1]) {
            const id = userData[0]._id;
            switch (userData[1]) {
                case 'watcher':
                    return navigate(`/watcher/${id}`);
                case 'supervisor':
                    //return console.log(userData[2])
                    return navigate(`/supervisor/${id}`);
                case 'boss':
                    return navigate(`/boss/${id}`);
            }
        }
    }, [userData]);
    
    const redirector = (e) => {
        e.preventDefault();
        dispatch(loginPrueba({ dni:3453245, password:"sdas12sqas" }));
    };

    return(
        <div className='background-color: black'>
            <form onSubmit={(e) => {redirector(e)}}>
                <label htmlFor="">dni:<input type="number" value={input.dni} name="dni"/></label>
                <label htmlFor="">password: <input type="text" value={input.password} name="password"/></label>
                <button>BOTÓN</button>
            </form>
        </div>
    )
}