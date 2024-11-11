import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import './UserList.css';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      UserService.deleteUser(id)
        .then(() => setUsers(users.filter((user) => user.id !== id)))
        .catch((error) => console.log(error));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.dob)}</td>
              <td>
                <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
