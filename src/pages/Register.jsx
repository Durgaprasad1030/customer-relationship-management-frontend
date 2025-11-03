// frontend/src/pages/Register.js
import React, { useState, useContext } from 'react';
// 1. Import Navigate
import { useNavigate, Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  // 2. Get token and loading state from context
  const { register, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  // If user is already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const { name, email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to register. User may already exist.');
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

  // 5. If no token, show the register form
  return (
    <div className="container">
      <div className="form-container">
        <h2>Counselor Register</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;