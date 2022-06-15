import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReports, resetReport } from './../../redux/actions';
import LoginController from './LoginController';
import '../styles/reusable/Reports.css'

export default function SentReports({show}) {
   const dispatch = useDispatch();
   const {relation} = useParams()
   const header = LoginController();
   const id = localStorage.getItem('id');
   
   const reports = useSelector((state) => state.reports);
   
   useEffect(() => {
      if(relation==='sender'||relation==='receiver'){
         dispatch(getReports(id, relation, header));
      }
      return ()=>{dispatch(resetReport())}
   }, []);

   let reportsDemo = [{
      title: "titulo de prueba",
      description: "description de pruebaaa a a a aaaaa aaaa aaaaaaaa a a",
      id: 1123341,
      profilePic: "",
   }]
console.log(reports)
   if(relation === "sender") {

      return (
         <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
         
            <div className="screen-reports">
               <h3 className="title">Your reports</h3>
               {
                  // reports.length ? reports.map(report => (
                  reportsDemo.length ? reportsDemo.map(report => (
                     
                     <div>
                        <div className="img"></div>
                        <h4>{report.title}</h4>
                        <p>{report.description}</p>
                        
                     </div>

                  )) : <h3 id="title-reports">You have no reports</h3>
               }
            </div>
         
         </div>
      )

   } else if (relation === "receiver") {

      return (
         <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
         
            {
               reports.length ? reports.map(report => (
                  <div className="screen-reports">
                     
                  </div>
               )) : <h3 id="title-reports">They did not send you reports</h3>
            }
         
         </div>
      )
         
   } else {
      <h3 id="title-reports">Error</h3>
   }




}
// return (

//    <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
//       {
//          reports.length ? reports.map(report => (
//             <div className="screen-reports">
//                {/* <p></p> */}
//                <h1>{report.title}</h1>
//                {
//                   relation==='sender'?
//                   <div>
//                      <h2>From You</h2>
//                      <h2>To {report.receiver.lastName} {report.receiver.name}</h2>
//                   </div>
//                   :
//                   <div>
//                      <h2>From {report.sender.lastName} {report.sender.name}</h2>
//                      <h2>To You</h2>
//                   </div>
//                }
//                <img src={report.picture} alt="Report"></img>
//                <h3>{!report.description?<h3>none</h3>:report.description}</h3>
//             </div>
//          )) : <h3 id="title-reports">You have no reports</h3>
//       }

//    </div>

// ) 