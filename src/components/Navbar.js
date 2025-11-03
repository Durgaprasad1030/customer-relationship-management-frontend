// frontend/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* 1. Change brand name and link to homepage */}
      <h1><Link to="/">EduCRM</Link></h1> 
      <ul>
        {token ? (
          <>
            {/* 2. Logged-in links */}
            <li><Link to="/enquiry">Submit Enquiry</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            {/* 3. Logged-out link: "Employee Login" button */}
            <li>
              <Link to="/login" className="login-button">
                Employee Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;