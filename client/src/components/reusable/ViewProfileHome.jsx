import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersById } from '../../redux/actions'
import { Link } from 'react-router-dom'
import './../styles/reusable/ViewProfileHome.css'

export default function ViewProfileHome({ user }) {

    // let user = useSelector(state => state.userDetails[0])
    // let dispatch = useDispatch()

    // useEffect(() => {

    //     dispatch(getUsersById(id, header))

    // }, [dispatch])


    if(user) {
        return (
            <div className="flex items-center justify-end my-2">
                <Link to={`/guard/${user._id}/profile`}>
                    {/* <div className='img'> */}
                    <img src={user.profilePic} alt="Not found" className="rounded-full w-[50px] h-[50px]" />
                    {/* </div> */}
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