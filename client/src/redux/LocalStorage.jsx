
import { useNavigate } from 'react-router-dom';

export function SaveToken(tokenHeader){
    localStorage.setItem('auth-token',tokenHeader)
}

export function AutoAuhtentication(){
    const navigate = useNavigate()
    const token = localStorage.getItem('auth-token')
    if(!token){
        navigate('/login')
        return;
    }
}