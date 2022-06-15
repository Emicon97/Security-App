import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersById } from '../../redux/actions'
import { Link } from 'react-router-dom'
import './../styles/reusable/ViewProfileHome.css'

export default function ViewProfileHome({ show }) {

    const id = localStorage.getItem('id');
    const lastName = localStorage.getItem('lastName');
    const name = localStorage.getItem('name');
    const picture = localStorage.getItem('picture');

//ashee
    if(id) {
        return (
            <div className="flex items-center justify-end m-auto mr-[15px]">
                <h4 className="text-lg font-extrabold font-['nunito'] ml-2">
                <span className={`${show ? 'text-[#ff5cf4]' : 'text-[#0023c4]'}`}>{name.charAt(0).toUpperCase()}</span><span>{name.slice(1)}</span>
                <span className="pl-1">{lastName.charAt(0).toUpperCase() + lastName.slice(1)}</span>
                </h4>
                <Link to={`/guard/${id}/profile`}>
                {
                    picture === undefined ?
                    <img title="Profile" src={picture} alt="Not found" className="rounded-full w-[35px] h-[35px]" /> :
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[35px] h-[35px]" fill="none" viewBox="0 0 24 24" stroke="#2340be" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </div>
    
        )
    }

}