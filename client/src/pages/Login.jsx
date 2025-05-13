import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setErrorMsg('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {errorMsg && <p className="login-error">{errorMsg}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a>.</p>
    </div>
  );
};

export default Login;



