import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Primary } from "./styles/Buttons";

export default function Logout() {
  const navigate = useNavigate();

  const handleRedirectLogOut = (e) => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  }
  
  return (
    <div className="flex justify-center items-center">
            {/* <Link to={'/'}> */}
                <button className={`${Primary()} font-extrabold text-lg`} onClick={handleRedirectLogOut}>
                    Log out
                </button>
            {/* </Link> */}
    </div>
  );
}