import { useDispatch } from 'react-redux';

import { Primary } from "./styles/Buttons";

import { logout } from './../redux/actions';

export default function Logout() {
  const dispatch = useDispatch();

  const handleRedirectLogOut = (e) => {
    dispatch(logout());
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