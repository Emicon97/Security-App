import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import Modal from "../reusable/Modal";
import TableEmployees from "./tableEmployees";
import { getEmployees, getUsersById } from "../../redux/actions";
import './style.css'
import { Primary } from "../styles/Buttons";

export default function BossProfile () {

    
    const [active, setActive] = useState(false);
    let dispatch = useDispatch();
    let { id } = useParams();
    let user = useSelector(state => state.userDetails[0])
    let supervisors = useSelector(state => state.employees)

    const toggle = () => {
        setActive(!active);
    };
    useEffect(() => {
        dispatch(getUsersById(id));
        dispatch(getEmployees(id, ""));
    }, [dispatch])





    return (
        <div className="home-boss">
            <div className="options">
                <ul className="options-list">
                    <Link to={`boss/${id}`}><li>Info</li></Link>
                    <Link to={`/user/${id}/profile`}><li>Perfil</li></Link>
                    <Link to= {`/user/${id}`}><li>Empleados</li></Link>
                    <Link to="/home/add"><li>Añadir Empleados</li></Link>
                </ul>
            </div>
            <div className="info-screen">


                <div className="contain-profile">
                    
                    <div className="profile">
                        <div className="contain-profile-img">
                            <img
                                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                                alt="foto de perfil"
                                width="300rem"
                                className={"pic"}
                            />
                            <button className="pruebaa">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="contain-profile--info">
                            <div className="button-edit">
                                <button className={Primary()}>Edit</button>
                            </div>
                            <div className="info">
                                <p>{user ? user.name : "undefined"}</p>
                                <p>{user ? user.email : "undefined"}</p>
                                <p>{user ? user.telephone : "undefined"}</p>
                                {/* <p>+54 9 351-935-935</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="employees">
<<<<<<< HEAD
                        <TableEmployees name={"Supervisores"} employees={user ? user.supervisor : []}/>
=======
                        <TableEmployees name={"Supervisores"} employees={supervisors ? supervisors : []}/>
>>>>>>> 1238c73fc3d57a8d8e1070815417988261a569bf
                    </div>
                    <div className="employees">
                        <TableEmployees name={"Guardias"} employees={user ? user.supervisor : []}/>
                    </div>

                </div>
                <Modal active={active} toggle={toggle}>
                    <img
                        className="w-80 h-80 rounded-full m-5"
                        src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                        alt="Foto de perfil"
                    />
                </Modal>


            </div>
            {/* <Link to="/home/add">
                <button style={{backgroundColor: "blue"}}>Add User</button>
            </Link> */}
        </div>
    )

}