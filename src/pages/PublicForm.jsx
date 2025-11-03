// frontend/src/pages/PublicForm.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import AuthContext from '../context/AuthContext';

const PublicForm = () => {
  const { api } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: '', // Set initial to empty for the dropdown placeholder
    message: '',
  });
  
  // Use a different name for the success/error message state
  // to avoid conflict with the 'message' field in formData
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { name, email, phone, courseInterest, message } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (courseInterest === "") {
      setFeedbackMessage("Please select a course.");
      return;
    }
    try {
      await api.post('/enquiries/public', formData);
      setFeedbackMessage('Enquiry submitted successfully!');
      setFormData({ // Reset form
        name: '',
        email: '',
        phone: '',
        courseInterest: '',
        message: '',
      });
    } catch (err) {
      setFeedbackMessage('Error submitting enquiry. Please check your details.');
    }
  };

  return (
    <div className="container">
      {/* Add 'modern-form' class to use new styles */}
      <div className="form-container modern-form">
        <h2>Course Enquiry Form</h2>
        <p className="form-subtitle">Fill in your details and we'll help you find the perfect course.</p>
        
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" value={name} onChange={onChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={email} onChange={onChange} placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={phone} onChange={onChange} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="form-group">
              <label htmlFor="courseInterest">Course Interest *</label>
              <select id="courseInterest" name="courseInterest" value={courseInterest} onChange={onChange} required>
                <option value="" disabled>Select a course</option>
                <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Additional Message</label>
            <textarea
              id="message"
              name="message"
              value={message} // Use 'message' from formData
              onChange={onChange}
              rows="4"
              placeholder="Tell us more about your goals and interests..."
            ></textarea>
          </div>
          
          <button type="submit">Submit Enquiry</button>
        </form>
        
        {/* Show feedback message */}
        {feedbackMessage && 
          <p className={feedbackMessage.includes('successfully') ? 'message' : 'error'}>
            {feedbackMessage}
          </p>
        }
        
        <p className="login-link">
          Already an employee? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default PublicForm;