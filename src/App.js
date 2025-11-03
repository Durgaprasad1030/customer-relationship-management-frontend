// frontend/src/App.js
import React from 'react';
// 1. Import useLocation
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicForm from './pages/PublicForm';
import LandingPage from './pages/LandingPage';
import './App.css'; 

// 2. Create a new component to contain the logic
const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/dashboard'; // Hide on dashboard

  return (
    <>
      {showNavbar && <Navbar />} {/* 3. Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/enquiry" element={<PublicForm />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 4. Render the new component */}
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;