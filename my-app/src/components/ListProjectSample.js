import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListProjectSample() {
  const [projectSamples, setProjectSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSample, setEditingSample] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    image: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get("/api/project-samples")
      .then((response) => {
        setProjectSamples(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteProjectSample = (id) => {
    axios
      .delete(`/api/project-samples/${id}`)
      .then((response) => {
        setProjectSamples(projectSamples.filter((sample) => sample._id !== id));
        console.log("Project sample deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting project sample:", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const updateProjectSample = (id) => {
    axios
      .put(`/api/project-samples/${id}`, editFormData)
      .then((response) => {
        setProjectSamples(
          projectSamples.map((sample) =>
            sample._id === id ? response.data : sample
          )
        );
        setEditingSample(null);
        console.log("Project sample updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating project sample:", error);
      });
  };

  const handleEdit = (sample) => {
    setEditingSample(sample._id);
    setEditFormData({
      title: sample.title,
      image: sample.image,
      city: sample.city,
      address: sample.address,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Project Samples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectSamples.map((sample) => (
          <div key={sample._id} className="bg-white p-6 rounded-lg shadow-lg">
            {editingSample === sample._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProjectSample(sample._id);
                }}
              >
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={editFormData.city}
                  onChange={handleEditChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSample(null)}
                  className="mt-4 ml-2 px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {sample.title}
                </h3>
                <img
                  src={sample.image}
                  alt={sample.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-gray-600">
                  <strong>City:</strong> {sample.city}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {sample.address}
                </p>
                <button
                  onClick={() => handleEdit(sample)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProjectSample(sample._id)}
                  className="mt-4 ml-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
