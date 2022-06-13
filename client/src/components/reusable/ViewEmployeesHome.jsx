import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEmployeeById, getEmployees, getUsersById } from "../../redux/actions"
import './../styles/reusable/ViewEmployeesHome.css'

import aos from "aos";
import 'aos/dist/aos.css'

export default function ViewEmployeesHome({ employees, id, header }) {
    let demo = useSelector(state => state.employees)
    let dispatch = useDispatch()
    let urlImg = "https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png"

    useEffect(() => {
        dispatch(getEmployees(id, header))
        aos.init({ duration: 700 })
    }, [dispatch])


    return (
        <div id="cards-employees-screen" className="m-auto mb-6">

            <h3>Employee<span>s</span></h3>

            <div className="screen-cards">

                {
                    demo.length
                        ? demo.map(employee => (

                            <div className="card-employees" key={employee._id} >
                                <h4 className="employees-num-tasks">{employee.workingHours}</h4>
                                <div className="employees-environment">
                                    <h4>{employee.environment[0]}</h4>
                                    <p>No c q puede ir aca, podria ser un vistazo del ultimo reporte</p>
                                </div>
                                <div className="employee-profile">
                                    <div className="img-profile-employee">
                                        <img src={employee.profilePic ? employee.profilePic : urlImg} alt="" />
                                    </div>
                                    <h4 className="name-employee">{employee.name} <span>{employee.lastName}</span></h4>
                                </div>
                            </div>

                        ))
                        : <h3>You have no employees</h3>
                }
            </div>


        </div>
    )

}