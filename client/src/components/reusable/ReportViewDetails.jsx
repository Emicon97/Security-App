import { useEffect, useState } from 'react'
import '../styles/reusable/ReportViewDetails.css'
import Modal from './Modal'

export default function ReportViewDetails({ report, relation }) {

    let [activeImg, setActiveImg] = useState(false)
    let [urlImg, setUrlImg] = useState("");
    let svgProfileUser = <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="#2340be" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    let togglePic = (event) => {
        // console.log(event, "ACAA")
        setUrlImg(event.target.src)
        setActiveImg(!activeImg)
    }

    useEffect(() => {
        !activeImg && setUrlImg("")
    }, [activeImg])

    return (

        <div className='screen-details-report'>

            <div className="left">

                <div className="img" onClick={event => togglePic(event)}>
                    {
                        relation === "receiver" ? (

                            report.sender.profilePic
                                ? (
                                    <img src={report.sender.profilePic ? report.sender.profilePic : ""} alt="" />
                                )
                                : svgProfileUser
                        ) : (

                            report.sender.profilePic
                                ? (
                                    <img src={report.sender.profilePic ? report.sender.profilePic : ""} alt="" />
                                )
                                : svgProfileUser
                        )
                    }

                </div>

                {
                    relation === "receiver" ? (

                        <div className="name-info">
                            <h3>{report.sender.name} {report.sender.lastName.slice(0, report.sender.lastName.length - 1)}<span className='pink'>{report.sender.lastName.slice(-1)}</span></h3>
                            <h4>{report.sender.environment}</h4>
                            <h5>{report.sender.email}</h5>
                            <h5>{report.sender.telephone}</h5>
                        </div>
                    ) : (
                        <div className="name-info">
                            <h3>{report.receiver.name} {report.receiver.lastName.slice(0, report.receiver.lastName.length - 1)}<span className='pink'>{report.receiver.lastName.slice(-1)}</span></h3>
                            <h4>{report.receiver.environment}</h4>
                            <h5>{report.receiver.email}</h5>
                            <h5>{report.receiver.telephone}</h5>
                        </div>
                    )
                }

            </div>

            <div className="right">

                <div className="info">
                    <h3 className="title">{report.title.slice(0, report.title.length - 1)}<span className="pink">{report.title.slice(-1)}</span></h3>
                    <h4 className="description">{report.description}</h4>
                    
                    {
                        report.picture
                        ? <div className="img">

                            <img src={report.picture} onClick={event => togglePic(event)} alt="" />

                        </div>
                        : null
                    }
                </div>


            </div>

            <Modal active={activeImg} toggle={togglePic}>
                {
                    urlImg
                        ? <img className="w-80 h-80 rounded-full m-5" src={urlImg} alt="" />
                        : svgProfileUser
                }
            </Modal>

        </div>
    )

}