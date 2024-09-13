"use client";
import React from 'react';
import { toast } from 'react-hot-toast';

const ViewApplicants = ({ applicants, onBack, jobPostingId, shopkeeperId }) => {

  const handleAction = async (action, applicantId) => {
    try {
      const response = await fetch('/api/accept-reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          applicantId: applicantId,
          jobPostingId: jobPostingId,
          shopkeeperId: shopkeeperId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        // Optionally, you can refetch applicants or handle UI changes here
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleAccept = (applicantId) => {
    handleAction('accept', applicantId);
  };

  const handleReject = (applicantId) => {
    handleAction('reject', applicantId);
  };

  return (
    <div className="applicant-list">
      <h2>Applicants</h2>
      {applicants.length > 0 ? (
        <ul>
          {applicants.map((applicantId, index) => (
            <li key={index} className="d-flex align-items-center">
              <span className="me-3">Applicant ID: {applicantId}</span>
              <button 
                className="btn btn-success me-2" 
                onClick={() => handleAccept(applicantId)}
              >
                Accept
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => handleReject(applicantId)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applicants found.</p>
      )}
      <button className="btn btn-secondary mt-3" onClick={onBack}>Back to Job Postings</button>
    </div>
  );
};

export default ViewApplicants;
