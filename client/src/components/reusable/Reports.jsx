import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getReports } from './../../redux/actions';
import LoginController from './LoginController';

export default function SentReports () {
   const dispatch = useDispatch();

   const header = LoginController();
   const id = localStorage.getItem('id');

   const reports = useSelector((state) => state.reports);

   useEffect(() => {
      dispatch(getReports(id, 'sender', header));
   }, []);

   return (
      <>
      { reports.length && reports.map((report) => {
         {console.log(report.title)}
         <>
         <p></p>
         <h1>{report.title}</h1>
         </>
      })}
      </>
   );
}