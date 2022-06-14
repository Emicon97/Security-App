import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersById } from '../../redux/actions'
import { Link } from 'react-router-dom'
import './../styles/reusable/ViewProfileHome.css'

export default function ViewProfileHome({ user }) {
    let id = localStorage.getItem('id')
    let rolUsuario = localStorage.getItem('user') 
    // let user = useSelector(state => state.userDetails[0])
    // let dispatch = useDispatch()

    // useEffect(() => {

    //     dispatch(getUsersById(id, header))

    // }, [dispatch])


    if(user) {
        return (
            <div className="flex items-center justify-end my-2">
                <Link to={`/guard/${user._id}/profile`}>
                    {
                        user.profilePic ?
                        <img src={user.profilePic} alt="Not found" className="rounded-full w-[50px] h-[50px]" /> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[50px] h-[50px]" fill="none" viewBox="0 0 24 24" stroke="#2340be" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                </Link>
                <h4 className="text-lg font-extrabold font-['nunito'] ml-2">
                    <span className="text-[#2340be]">{user.name}</span>
                    <span className="text-[#ff61f6] pl-1">{user.lastName}</span>
                </h4>
                <Link to={`/guard/${user._id}/profile`} className='w-3 h-3 bg-[#2340be] rounded-full mx-3'>
                </Link>
            </div>
    
        )
    }

}