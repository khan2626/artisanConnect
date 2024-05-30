//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
//import Login from "./components/Login.js";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UsersList from "./pages/UsersList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/users" component={UsersList} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
