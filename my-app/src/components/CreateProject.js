import React, { useState, useRef } from "react";
// import axios from "axios";

export default function CreateProject(props) {
  const initialFormData = {
    title: "",
    projectImage: null,
    category: "",
    budget: "",
    location: "",
    status: "open",
  };
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    props.createProjectHandler(formData);
    console.log(formData);
    setFormData(initialFormData);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Create New Project
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mb-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="projectImage"
        >
          Image
        </label>
        <input
          type="file"
          name="projectImage"
          ref={fileInputRef}
          onChange={handleChange}
          className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          required
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mb-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {[
            "Carpenter",
            "Mason",
            "Plumber",
            "Electrician",
            "Painter",
            "Tiler",
            "Roofer",
            "Welder",
            "Blacksmith",
            "Mechanic",
            "Cabinet Maker",
            "Furniture Maker",
            "Wood Turner",
            "Tailor",
            "Seamstress",
            "Weaver",
            "Jeweler",
            "Silversmith",
            "Goldsmith",
            "Sculptor",
            "Painter (Fine Arts)",
            "Ceramicist/Potter",
            "Baker",
            "Pastry Chef",
            "Butcher",
            "Barber",
            "Hairdresser",
            "Beautician",
            "Computer Repair Technician",
            "Mobile Phone Repair Technician",
            "Auto Mechanic",
            "Auto Electrician",
            "Cleaner",
            "Gardener",
            "Handyman",
            "Photographer",
            "Videographer",
            "DJ",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="budget"
        >
          Budget
        </label>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mb-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mb-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mb-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="open">Open</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
