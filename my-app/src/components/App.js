import React from "react";

//import "./App.css";
import CreateUser from "./CreateUser";
import Header from "./Header";
import CreateProject from "./CreateProject";
// import UserList from "./UserList";
import Login from "./Login";
import ListProjects from "./ListProjects";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const createUserHandler = (userData) => {
    console.log(userData);
  };

  const createProjectHandler = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Project created successfully:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route
            path="/"
            element={<h2>Welcome to the Project Management App</h2>}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<CreateUser createUserHandler={createUserHandler} />}
          />
          <Route
            path="/create-project"
            element={
              <CreateProject createProjectHandler={createProjectHandler} />
            }
          />
          <Route path="/list-projects" element={<ListProjects />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
