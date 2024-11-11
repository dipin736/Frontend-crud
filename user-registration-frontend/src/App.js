import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';  // Importing the stylesheet

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  return (
    <Router>
      <AppContent userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
    </Router>
  );
};

const AppContent = ({ userToEdit, setUserToEdit }) => {
  const navigate = useNavigate();
  
  const handleEdit = (user) => {
    setUserToEdit(user);
    navigate(`/edit/${user.id}`);
  };

  return (
    <div className="app-container">
      <nav className="navbar" id='navigation-buttons'>
        <button onClick={() => navigate('/')} className="navbar-btn">Home</button>
        <button onClick={() => navigate('/add')} className="navbar-btn">Add New User</button>
      </nav>
      <header className="app-header">
        <h1>User Registration</h1>
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<UserList onEdit={handleEdit} />} />
          <Route path="/add" element={<UserForm onSubmit={() => setUserToEdit(null)} />} />
          <Route path="/edit/:id" element={<UserForm userToEdit={userToEdit} onSubmit={() => setUserToEdit(null)} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
