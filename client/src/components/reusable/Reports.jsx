import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getReports, resetReport } from './../../redux/actions';
import LoginController from './LoginController';

export default function SentReports({show}) {
   const dispatch = useDispatch();
   const {relation} = useParams()
   console.log('relation',relation)
   const header = LoginController();
   const id = localStorage.getItem('id');
   
   const reports = useSelector((state) => state.reports);
   
   useEffect(() => {
      console.log(reports)
      if(relation==='sender'||relation==='receiver'){
         dispatch(getReports(id, relation, header));
      }
      return ()=>{dispatch(resetReport())}
   }, []);

   return (

      <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
         {
            reports.length && reports.map(report => (
               <>
                  <p></p>
                  <h1>{report.title}</h1>
                  {
                     relation==='sender'?
                     <div>
                        <h2>From You</h2>
                        <h2>To {report.receiver.lastName} {report.receiver.name}</h2>
                     </div>
                     :
                     <div>
                        <h2>From {report.sender.lastName} {report.sender.name}</h2>
                        <h2>To You</h2>
                     </div>
                  }
                  <img src={report.picture} alt="Report"></img>
                  <h3>{!report.description?<h3>none</h3>:report.description}</h3>
               </>
            ))
         }

      </div>

   ) 



}