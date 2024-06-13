import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";

// import CreateUser from "./components/CreateUser";
// import ListProjects from "./components/ListProjects";
// import CreateProject from "./components/CreateProject";
// import Login from "./components/Login";
// import Layout from "./Layout";
// import createProjectHandler from "./components/App";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="list-projects" element={<ListProjects />}></Route>
//       <Route
//         path="create-project"
//         element={<CreateProject createProjectHandler={createProjectHandler} />}
//       ></Route>
//       <Route path="register" element={<CreateUser />}></Route>
//       <Route path="login" element={<Login />}></Route>
//     </Route>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
