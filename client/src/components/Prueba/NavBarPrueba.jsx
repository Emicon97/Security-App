import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import './NavBarPrueba.css'

export default function NavBarPrueba () {

    return (
        <div className="nav">
            <div className="logo-container">
                <Link to={""} className="link-logo">
                    <img src={logo} className="img" alt="Centinel Logo" />
                    <h3 className="title-img">
                        <span className="blue">C</span>entine<span className="pink">l</span>
                    </h3>
                </Link>
            </div>
            <div className="list-items">
                <ul>
                    <li><img src="https://cdn.icon-icons.com/icons2/936/PNG/512/home_icon-icons.com_73532.png" alt="" /> Dashboard</li>
                    <li><img src="https://cdn.icon-icons.com/icons2/936/PNG/512/group-profile-users_icon-icons.com_73540.png" alt="" /> Empleados</li>
                    <li><img src="https://cdn.icon-icons.com/icons2/3252/PNG/512/form_new_regular_icon_205269.png" alt="" /> Asignar Tareas</li>
                    <li><img src="https://cdn.icon-icons.com/icons2/1303/PNG/512/checkform_85890.png" alt="" /> Ver Tareas</li>
                </ul>
            </div>
            {/* <Link to="https://portafolio-av.vercel.app/"> */}
                <a href="https://portafolio-av.vercel.app/">
                    <button className="logout">log<span>out</span></button>

                </a>
            {/* </Link> */}
        </div>
    )

}