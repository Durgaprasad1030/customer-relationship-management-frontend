// frontend/src/components/EnquiryList.js

import React from 'react';

const EnquiryList = ({ enquiries, onClaim, onUnclaim, isPublic }) => {
  
  // If the list is empty, show this message
  if (enquiries.length === 0) {
    return <p>No enquiries found.</p>;
  }

  // If the list has items, show the list
  return (
    <ul className="enquiry-list">
      {enquiries.map((enq) => (
        <li key={enq._id} className="enquiry-item">
          <h4>{enq.name}</h4>
          <p>Email: {enq.email}</p>
          <p>Course: {enq.courseInterest}</p>
          <p>Submitted: {new Date(enq.createdAt).toLocaleDateString()}</p>
          
          {/* Show Claim button if public */}
          {isPublic && (
            <button onClick={() => onClaim(enq._id)} className="claim-btn">
              Claim
            </button>
          )}

          {/* Show Unclaim button if NOT public (i.e., private) */}
          {!isPublic && (
            <button onClick={() => onUnclaim(enq._id)} className="unclaim-btn">
              Unclaim
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EnquiryList;