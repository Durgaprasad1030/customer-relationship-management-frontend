// frontend/src/pages/Dashboard.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import EnquiryCard from '../components/EnquiryCard'; // Import new card
import { FaSignOutAlt, FaBriefcase, FaUsers } from 'react-icons/fa'; // Import icons

const Dashboard = () => {
  const { api, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('public'); // 'public' or 'private'
  
  const [publicEnquiries, setPublicEnquiries] = useState([]);
  const [myEnquiries, setMyEnquiries] = useState([]);

  const fetchEnquiries = useCallback(async () => {
    try {
      // Show all enquiries in public, even those with new fields
      const publicRes = await api.get('/enquiries/public');
      setPublicEnquiries(publicRes.data);
      
      const privateRes = await api.get('/enquiries/private');
      setMyEnquiries(privateRes.data);
    } catch (err) {
      console.error(err);
    }
  }, [api]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleClaim = async (id) => {
    try {
      await api.post(`/enquiries/claim/${id}`);
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to claim enquiry', err);
    }
  };

  const handleUnclaim = async (id) => {
    try {
      await api.post(`/enquiries/unclaim/${id}`);
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to unclaim enquiry', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine which list to show
  const enquiriesToShow = activeTab === 'public' ? publicEnquiries : myEnquiries;

  return (
    <div className="dashboard-page"> {/* New main wrapper */}
      
      {/* New Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-title">
          <h2>CRM Dashboard</h2>
          <p>Welcome, {user ? user.name : 'Counselor'}</p>
        </div>
        <button onClick={handleLogout} className="sign-out-btn">
          Sign Out <FaSignOutAlt />
        </button>
      </header>
      
      {/* New Tab Navigation */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'public' ? 'active' : ''}`}
          onClick={() => setActiveTab('public')}
        >
          <FaUsers /> Public Enquiries
        </button>
        <button
          className={`tab-btn ${activeTab === 'private' ? 'active' : ''}`}
          onClick={() => setActiveTab('private')}
        >
          <FaBriefcase /> My Enquiries
        </button>
      </nav>
      
      {/* New Content Area */}
      <main className="dashboard-content">
        {enquiriesToShow.length > 0 ? (
          <div className="enquiry-grid">
            {enquiriesToShow.map((enq) => (
              <EnquiryCard
                key={enq._id}
                enquiry={enq}
                onClaim={handleClaim}
                onUnclaim={handleUnclaim}
                isPublic={activeTab === 'public'}
              />
            ))}
          </div>
        ) : (
          <div className="no-enquiries-message">
            <p>No {activeTab} enquiries found.</p>
          </div>
        )}
      </main>
      
    </div>
  );
};

export default Dashboard;