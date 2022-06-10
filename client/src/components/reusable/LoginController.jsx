

function LoginController(){
    const header = localStorage.getItem('auth-token')
    console.log(header)
return(
    {headers:{'auth-token':header}}
)}

export default LoginController;