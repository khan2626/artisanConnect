import React, { useState } from "react";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    profile: {
      name: "",
      bio: "",
      location: {
        city: "",
        address: "",
      },
      profilePicture: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else if (keys.length === 2) {
      setFormData({
        ...formData,
        profile: { ...formData.profile, [keys[1]]: value },
      });
    } else if (keys.length === 3) {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          location: { ...formData.profile.location, [keys[2]]: value },
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create user
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User created:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="artisan">Artisan</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <br />
        <fieldset>
          <legend>Profile</legend>
          <label>
            Name:
            <input
              type="text"
              name="profile.name"
              value={formData.profile.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Bio:
            <textarea
              name="profile.bio"
              value={formData.profile.bio}
              onChange={handleChange}
            ></textarea>
          </label>
          <br />
          <fieldset>
            <legend>Location</legend>
            <label>
              City:
              <input
                type="text"
                name="profile.location.city"
                value={formData.profile.location.city}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="profile.location.address"
                value={formData.profile.location.address}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <br />
          <label>
            Profile Picture URL:
            <input
              type="text"
              name="profile.profilePicture"
              value={formData.profile.profilePicture}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
