import React, { Component } from "react";
import Portal from "./Portal";

export default class Modal extends Component {
  render() {
    const {children, toggle, active} = this.props;
      return (
        <Portal>
          {
            active && (
              <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur bg-white-300 flex justify-center items-center">
                <div className="fixed bg-[#FFFFFF] p-5 pt-12 rounded-3xl shadow-xl shadow-slate-300">
                  <button onClick={toggle} className="absolute top-2.5 right-2.5 flex justify-center items-center bg-[#F4F6FA] w-7 h-7 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="p-5 bg-[#EEEDFF] rounded-2xl">
                    {children}
                  </div>
                </div>
              </div>
            )
          }
        </Portal>
      );
  };
};

const Div1 = `
  fixed w-screen h-screen top-0 left-0 backdrop-blur bg-white-300
`;

const Div2 = `
  absolute top-11 left-[30%] bg-[#FFFFFF] rounded-2xl w-2/5 h-5/6
`;

const Div3 = `
  bg-[#EEEDFF] absolute top-20 right-6 left-6 bottom-6 rounded-2xl flex justify-center items-center
`;
