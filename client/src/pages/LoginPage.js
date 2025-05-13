import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
