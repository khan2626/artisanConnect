import React from "react";

//import "./App.css";
import CreateUser from "./CreateUser";
import Header from "./Header";
import CreateProject from "./CreateProject";
//import UserList from "./UserList";
import Login from "./Login";

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
      <Login />
      <CreateUser createUserHandler={createUserHandler} />
      <CreateProject createProjectHandler={createProjectHandler} />
      {/* <UserList /> */}
    </div>
  );
}

export default App;
