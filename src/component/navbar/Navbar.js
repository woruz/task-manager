import React from 'react';
import './Navbar.css';

const Navbar = ({ username, onCreateTask, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false)
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Task Manager
      </div>
      <div className="navbar-actions">
        <button className="create-task-btn" onClick={onCreateTask}>Create Task</button>
        <div className="navbar-user">
          <span className="username">{username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;