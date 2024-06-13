import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItem from "./UserItem";
import EditUser from "./EditUser";
// import { useParams } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  return (
    <div className="user-list">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">User List</h2>
      {editingUser ? (
        <EditUser
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
}
