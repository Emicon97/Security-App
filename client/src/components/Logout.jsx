import { useDispatch } from 'react-redux';

import { Primary } from "./styles/Buttons";

import { logout } from './../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirectLogOut = (e) => {
    localStorage.removeItem('auth-token');
    navigate('/');
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