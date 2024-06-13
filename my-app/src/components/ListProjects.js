import React, { useEffect, useState } from "react";
import axios from "axios";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get("http://localhost:4000/projects");
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="mb-2 p-4 border rounded">
            <h3 className="text-xl">{project.title}</h3>
            <p>Category: {project.category}</p>
            <p>Budget: {project.budget}</p>
            <p>Location: {project.location}</p>
            <p>Status: {project.status}</p>
            {project.projectImage && (
              <img
                src={require(`/uploads/${project.projectImage}`)}
                alt={project.title}
                className="mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListProjects;
