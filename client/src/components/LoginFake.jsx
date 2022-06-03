import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from "react-router-dom";

import { loginPrueba } from '../redux/actions';

export default function LoginFake(){
    // const dispatch = useDispatch();
    // const userdata = useSelector((state)=>state.userData);
    // const navigate = useNavigate ();
    // const [ input, setInput ] = useState({
    //     dni:"",
    //     password:""
    // });

    // useEffect(() => {
    //     if (userdata[1]) {
    //         console.log('acá');
    //         navigate('/supervisor/628efaec038a543cbc4c1f49');
    //     }
    // }, [userdata]);
    
    // const redirector = (e) => {
    //     e.preventDefault();
    //     dispatch(loginPrueba({ dni:23000, password:"12345" }));
    // };

    const dispatch = useDispatch();
    const userdata = useSelector((state)=>state.userData);
    const navigate = useNavigate ();
    const [ input, setInput ] = useState({
        dni:"",
        password:""
    });

    useEffect(() => {
        if (userdata[1]) {
            const id = userdata[0]._id;
            switch (id) {
                case 'watcher':
                    return navigate(`/watcher/${id}`);
                case 'supervisor':
                    return navigate(`/supervisor/${id}`);
                case 'boss':
                    return navigate(`/boss/${id}`);
            }
        }
    }, [userdata]);
    
    const redirector = (e) => {
        e.preventDefault();
        dispatch(loginPrueba({ dni:1234, password:"1234" }));
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