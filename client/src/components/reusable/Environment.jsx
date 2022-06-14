import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEnvironments, getReports } from './../../redux/actions';
import LoginController from './LoginController';

export default function SentReports({show}) {
   const dispatch = useDispatch();

   const header = LoginController();
   const user = local.getItem('user');
   const id = localStorage.getItem('id');

   const reports = useSelector((state) => state.reports);

   useEffect(() => {
      dispatch(getAllEnvironments(header));
   }, []);

   return (

      <div className={`fixed top-16 right-0 bottom-0 ${show ? "left-[245px]" : "left-[87px]"} ease-in-out transition-all duration-700`}>
         { user === 'boss' ? 'hola ': null}
         {
            reports.length && reports.map(report => (
               <>
                  <p></p>
                  <h1>{report.title}</h1>
                  <h2>From You</h2>
                  <h2>To {report.receiver.lastName} {report.receiver.name}</h2>
                  <img src={report.picture} alt="Report"></img>
                  <h3>{report.description}</h3>
               </>
            ))
         }

      </div>

   ) 
}