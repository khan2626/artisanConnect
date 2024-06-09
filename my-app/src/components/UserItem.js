import React from "react";

export default function UserItem({ user, onDelete, onEdit }) {
  return (
    <div className="user-item p-4 mb-4 border border-gray-300 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Bio: {user.bio}</p>
      <p>City: {user.city}</p>
      <p>Address: {user.address}</p>
      {user.profilePicture && (
        <img
          src={`/uploads/${user.profilePicture}`}
          alt="Profile"
          className="w-16 h-16 rounded-full mt-2"
        />
      )}
      <div className="mt-4">
        <button
          onClick={() => onEdit(user)}
          className="mr-2 py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
