// frontend/src/components/EnquiryCard.js
import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns'; // For "Submitted 1 minute ago"

// Helper to format the course tag
const getCourseTagClass = (course) => {
  if (!course) return 'tag-other';
  const formatted = course.toLowerCase();
  if (formatted.includes('data science')) return 'tag-ds';
  if (formatted.includes('stack')) return 'tag-web';
  if (formatted.includes('ux/ui')) return 'tag-ui';
  if (formatted.includes('ai')) return 'tag-ai';
  return 'tag-other';
};

const EnquiryCard = ({ enquiry, onClaim, onUnclaim, isPublic }) => {
  
  const submittedAt = formatDistanceToNow(new Date(enquiry.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="enquiry-card">
      <div className="card-header">
        <h3>{enquiry.name}</h3>
        <span>Submitted {submittedAt}</span>
      </div>
      <div className="card-body">
        <div className="info-item">
          <FaEnvelope />
          <span>{enquiry.email}</span>
        </div>
        
        {/* Only show phone if it exists */}
        {enquiry.phone && (
          <div className="info-item">
            <FaPhoneAlt />
            <span>{enquiry.phone}</span>
          </div>
        )}

        <div className={`course-tag ${getCourseTagClass(enquiry.courseInterest)}`}>
          {enquiry.courseInterest}
        </div>
      </div>
      <div className="card-footer">
        {isPublic ? (
          <button onClick={() => onClaim(enquiry._id)} className="card-btn claim">
            Claim Lead
          </button>
        ) : (
          <button onClick={() => onUnclaim(enquiry._id)} className="card-btn unclaim">
            Unclaim Lead
          </button>
        )}
      </div>
    </div>
  );
};

export default EnquiryCard;