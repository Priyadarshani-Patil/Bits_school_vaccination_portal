import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this file exists

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg('All fields are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registered:', res.data);
      window.location.href = '/login';
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {errorMsg && <div className="error">{errorMsg}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;
