import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get("http://localhost:4000/projects");
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="bg-green-500 text-center">
        <h2 className="text-3xl mb-5 ">Projects</h2>
      </div>
      <div className="container mx-auto p-4 bg-blue-500">
        <ul>
          {projects.map((project) => (
            <li key={project._id} className="mb-2 p-4 border rounded">
              {project.userId && (
                <div className="user-info">
                  <img
                    src={project.userId.profilePicture}
                    alt={project.userId.name}
                  >
                    <p>{project.userId.name}</p>
                  </img>
                  <p>
                    Created at: {new Date(project.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
              <h3 className="text-xl">{project.title}</h3>
              <p>Category: {project.category}</p>
              <p>Budget: {project.budget}</p>
              <p>Location: {project.location}</p>
              <p>Status: {project.status}</p>
              {project.projectImage && (
                <img
                  src={require(`/uploads/${project.projectImage}`)}
                  alt={project.title}
                  className="mt-2 h-48 w-52"
                />
              )}
            </li>
          ))}
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-16 cursor-pointer mt-6"
          onClick={() => navigate("/create-project")}
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </>
  );
};

export default ListProjects;
