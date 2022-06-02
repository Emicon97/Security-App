import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getUsersById } from "../../redux/actions";
import { Primary } from "../styles/Buttons";
import Modal from "../reusable/Modal";
import TableEmployees from "./tableEmployees";
import './style.css'

export default function HomeBoss() {


    const [active, setActive] = useState(false);
    let dispatch = useDispatch();
    let { id } = useParams();
    let user = useSelector(state => state.userDetails)
    console.log(user)
    const toggle = () => {
        setActive(!active);
    };


    useEffect(() => {
        dispatch(getUsersById(id));
    }, [dispatch])


    const Image = () => `
    rounded-full 
    border-4 border-white
    ring-4 ring-[#0243EC]
    m-5
  `;


    return 

}