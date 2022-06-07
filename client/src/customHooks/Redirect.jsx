import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

export default function Redirect () {
    let navigate = useNavigate()
    
    useEffect(() => {
        navigate("/")
    }, [])

}