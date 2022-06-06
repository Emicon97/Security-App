import { useSelector } from 'react-redux';

function LoginController(){
 const header = useSelector(state => state.token)
return(
    {headers:{'auth-token':header}}
)}

export default LoginController;