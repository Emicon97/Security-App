import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReports, resetReport } from './../../redux/actions';
import LoginController from './LoginController';
import '../styles/reusable/Reports.css'
import Modal from './Modal';
import ReportViewDetails from './ReportViewDetails';

export default function SentReports({ show }) {
   const dispatch = useDispatch();
   const { relation } = useParams()
   const header = LoginController();
   const id = localStorage.getItem('id');
   const [activeInfo, setActiveInfo] = useState(false)
   const reports = useSelector((state) => state.reports);
   let [reportUser, setReportUser] = useState(null)

   const toggleInfo = (event, i) => {
      setReportUser(reports[i]);
      setActiveInfo(!activeInfo);
   }


   useEffect(() => {
      if (relation === 'sender' || relation === 'receiver') {
         dispatch(getReports(id, relation, header));
      }
      return () => { dispatch(resetReport()) }
   }, [relation]);

   if (relation === "sender") {

      return (
         <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>

            <div className="screen-reports overflow-y-auto overflow-x-hidden">
               <h3 className={`title title-pink`}>Your reports</h3>
               <div className="container-reports">

                  {
                     reports.length ? reports.map((report, i) => (

                        <div key={report._id} className="report blue" onClick={event => toggleInfo(event, i)}>
                           <div className="text-from">
                              <h5 id="pink">to <span>{report.receiver.name}</span> <span>{report.receiver.lastName}</span></h5>
                           </div>
                           <h4>{report.title}</h4>
                           <p>{report.description}</p>

                        </div>

                     )) : <h3 id="title-reports">You have no reports</h3>
                  }

               </div>

            </div>

            <Modal active={activeInfo} toggle={toggleInfo}>
               <ReportViewDetails report={reportUser} relation={relation} />
            </Modal>

         </div>
      )

   } else if (relation === "receiver") {

      return (
         <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>

            <div className="screen-reports overflow-y-auto overflow-x-hidden">
               <h3 className="title title-blue">Your reports</h3>
               <div className="container-reports">

                  {
                     reports.length ? reports.map((report, i) => (

                        <div className="report pink" onClick={event => toggleInfo(event, i)}>
                           <div className="text-from">
                              <h5 id="blue">from <span>{report.sender.name}</span> <span>{report.sender.lastName}</span></h5>
                           </div>
                           <h4>{report.title}</h4>
                           <p>{report.description}</p>

                        </div>

                     )) : <h3 id="title-reports">They did not send you reports</h3>
                  }

               </div>

            </div>

            <Modal active={activeInfo} toggle={toggleInfo}>
               <ReportViewDetails report={reportUser} relation={relation} />
            </Modal>

         </div>

      )

   } else {
      <h3 id="title-reports">Error</h3>
   }

};