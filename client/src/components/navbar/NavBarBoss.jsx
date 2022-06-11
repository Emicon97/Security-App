import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUsersById } from '../../redux/actions'

export default function NavBarBoss ({userData, show}) {
    return (
        <>
            {
                userData ? 
                <li className='flex flex-col items-center gap-1'>
                    <Link className="flex w-full my-2" to={`/boss/${userData}`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Dashboard</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/boss/${userData}/profile`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Profile</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/boss/${userData}/employees`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Employees</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/boss/${userData}/createTask`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Assign tasks</p>
                        </button>
                    </Link>
                    <Link className="flex w-full my-2" to={`/boss/${userData}/add`}>
                        <button className="flex focus:text-black hover:text-black cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#cbcfdd]">
                            <button className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Add employees</p>
                        </button>
                    </Link>
                </li>
                : null
            }
        </>
    )

}