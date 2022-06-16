import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees
} from "../../redux/actions";
import "./../styles/reusable/ViewEmployeesHome.css";

import aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function ViewEmployeesHome({ employees, id, header }) {
  let demo = useSelector((state) => state.employees);
  let dispatch = useDispatch();
  let urlImg =
    "https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png";
  useEffect(() => {
    dispatch(getEmployees(id, header));
    aos.init({ duration: 700 });
  }, [dispatch]);
  let hierarchy = localStorage.getItem("user");

  return (
    <div id="cards-employees-screen" className="mr-auto my-5 ml-[30px] w-[93.5%] h-auto rounded-2xl bg-[#0023c480] p-3.5">
      <div className="flex justify-between">
        <h3 className="text-3xl font-extrabold font-['nunito'] text-white">Employees</h3>
        <Link className="flex items-center cursor-pointer" to={`/${hierarchy}/${id}/employees`}>
          <p title="List of employees" className="font-extrabold font-['nunito'] text-white">More</p>
          <svg title="List of employees" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      <div className="screen-cards">
        {demo.length ? (
          demo.map((employee) => (
            <Link to={`/${hierarchy}/${id}/seeTasks/${employee._id}`} key={employee._id}>
              < div className="card-employees">
                <h4 className="employees-num-tasks">{employee.workingHours}</h4>
                <div className="employees-environment">
                  <h4>{employee.environment}</h4>
                </div>
                <div className="employee-profile">
                  <div className="img-profile-employee">
                    <img
                      src={employee.profilePic ? employee.profilePic : urlImg}
                      alt=""
                    />
                  </div>
                  <h4 className="name-employee">
                    {employee.name} <span>{employee.lastName}</span>
                  </h4>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h3>No tienes empleados</h3>
        )}
      </div>
    </div >
  );
}
