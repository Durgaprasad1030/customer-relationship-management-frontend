// frontend/src/pages/LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaUsers, FaHandsHelping } from 'react-icons/fa';
import './LandingPage.css'; // We will create this file next

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Course</h1>
          <p>Discover the right educational path for your future. Our expert counselors are here to guide you.</p>
          <Link to="/enquiry" className="cta-button">
            Get Started <span className="arrow">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon book">
            <FaBookOpen size={40} />
          </div>
          <h3>Wide Range of Courses</h3>
          <p>From Web Development to AI & Machine Learning</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon users">
            <FaUsers size={40} />
          </div>
          <h3>Expert Counselors</h3>
          <p>Dedicated professionals to guide your journey</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon support">
            <FaHandsHelping size={40} />
          </div>
          <h3>Personalized Support</h3>
          <p>One-on-one guidance tailored to your goals</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;