import React, { Component } from "react";
import Portal from "./Portal";


export default class Modal extends Component {
    render(){
        const {children, toggle, active} = this.props;
        return (
           
            <Portal>
                {active && (
                    <div className=" duration-300 absolute inset-0 backdrop-blur-md bg-white-50">
                        <div className="absolute top-11 left-[30%] bg-[#FFFFFF] rounded-2xl w-2/5 h-5/6">
                            <button onClick={toggle} className="absolute top-6 right-6 flex justify-center items-center bg-[#F4F6FA] w-7 h-7 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="bg-[#EEEDFF] absolute top-20 right-6 left-6 bottom-6 rounded-2xl flex justify-center items-center">
                                {children}
                            </div>
                            <div onClick={toggle} className="bg-white opacity-5"/>
                        </div>
                    </div>
                )}
            </Portal>
           
        )
    }
}

const Wrapper = () => `
`;