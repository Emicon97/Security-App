
import React from "react";
// import GuardProfile from "./components/GuardProfile";
import TableInfoSupervisors from "./components/TableInfoSupervisors";

function App() {
    return (
        <div className='container max-w-5xl mx-auto bg-green-400 rounded-xl shadow border p-5 m-10'>
            <p className="text-3xl text-gray-700 font-bold mb-5">
                Welcome!
            </p>
            <p className="text-gray-500 text-lg">
                React and Tailwind CSS in action
            </p>
            <TableInfoSupervisors/>
            
        </div>
    );
};

export default App;