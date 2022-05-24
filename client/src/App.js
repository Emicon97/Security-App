import React from "react";
import "./App.css";
import LoginButton from "./components/LoginButton"


function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h2>Security App</h2>
          <LoginButton></LoginButton>
        </header>
      </div>
  );
}

export default App;
