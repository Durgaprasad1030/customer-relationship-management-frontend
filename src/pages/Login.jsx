// frontend/src/pages/Login.js
import React, { useState, useContext } from 'react';
// 1. Import Navigate
import { useNavigate, Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  // 2. Get token and loading state from context
  const { login, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  // If user is already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  // 3. Add this check
  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  // 4. If user is already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // 5. If no token, show the login form
  return (
    <div className="container">
      <div className="form-container">
        <h2>Counselor Login</h2>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;