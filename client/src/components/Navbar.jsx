import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> |
      <Link to="/students">Students</Link> |
      <Link to="/drives">Drives</Link> |
      <Link to="/reports">Reports</Link> |
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
