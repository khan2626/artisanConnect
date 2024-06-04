import React from "react";

//import "./App.css";
import CreateUser from "./CreateUser";
import Header from "./Header";

function App() {
  const createUserHandler = (userData) => {
    console.log(userData);
  };
  return (
    <div>
      <Header />
      <CreateUser createUserHandler={createUserHandler} />
    </div>
  );
}

export default App;
