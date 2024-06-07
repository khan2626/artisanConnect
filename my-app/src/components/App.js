import React from "react";

//import "./App.css";
import CreateUser from "./CreateUser";
import Header from "./Header";
import CreateProject from "./CreateProject";

function App() {
  const createUserHandler = (userData) => {
    console.log(userData);
  };

  const createProjectHandler = (project) => {
    console.log(project);
  };

  return (
    <div>
      <Header />
      <CreateUser createUserHandler={createUserHandler} />
      <CreateProject createProjectHandler={createProjectHandler} />
    </div>
  );
}

export default App;
