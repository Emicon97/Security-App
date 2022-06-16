import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Primary } from "./styles/Buttons";

export default function Logout() {
  const navigate = useNavigate();

  const handleRedirectLogOut = (e) => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    navigate('/login');
  }
  
  return (
    <div className="flex justify-center items-center">
      <button className={`${Primary()} font-extrabold text-lg`} onClick={handleRedirectLogOut}>
          Log out
      </button>
    </div>
  );
}