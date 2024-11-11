import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import './UserForm.css';

const UserForm = ({ userToEdit, onSubmit }) => {
  const [user, setUser] = useState({ name: '', email: '', dob: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDob = new Date(user.dob).toISOString().split('T')[0];
    const userData = {
      ...user,
      dob: formattedDob,  
    };

    if (user.id) {
      // Update user
      UserService.updateUser(user.id, userData)
        .then(() => {
          onSubmit();
          navigate('/'); 
        })
        .catch((error) => {
          console.log('Update Error:', error);
          if (error.response) {
            console.error('Backend Error:', error.response.data);
          }
        });
    } else {
      UserService.addUser(userData)
        .then(() => {
          onSubmit();
          navigate('/');  
        })
        .catch((error) => {
          console.log('Add Error:', error);
          if (error.response) {
            console.error('Backend Error:', error.response.data);
            if (error.response.data.email && error.response.data.email[0].includes('already exists')) {
              alert('This email is already taken. Please use a different email.');
            }
          }
        });
    }
  };

  return (
    <div className="form-container">
      <h2>{user.id ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{user.id ? 'Update User' : 'Save User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
