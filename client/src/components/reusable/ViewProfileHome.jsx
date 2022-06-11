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
            <div id="profile-home">
    
                <div className="profile">
                    <Link to={`/guard/${user._id}/profile`}>
                        <div className='img'>
                            <img src={user.profilePic} alt="" />
                        </div>
                    </Link>
    
                    <h4 className="name-profile">
                        <span className="name">{user.name}</span>
                        <span className="lastname">{user.lastName}</span>
                    </h4>
                    
                    <Link to={`/guard/${user._id}/profile`}>
                        <div className="setting-profile">
                            <div></div>
                        </div>
                    </Link>
    
                </div>
    
            </div>
    
        )
    }

}