
import { useDispatch, useSelector } from 'react-redux';

export default function EnvironmentUsers({show}){
    const dispatch = useDispatch();
    const environmentUsers = useSelector((state)=>state.environmentUsers);
    
}