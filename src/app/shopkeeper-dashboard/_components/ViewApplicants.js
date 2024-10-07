"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './ViewApplicant.css';

const ViewApplicants = ({ applicants, onBack, jobPostingId, shopkeeperId }) => {
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const [rejectedApplicants, setRejectedApplicants] = useState([]);
  
  const [remainingApplicants, setRemainingApplicants] = useState(applicants);

  useEffect(() => {
    const fetchAcceptedApplicants = async () => {
      const response = await fetch('/api/accept-reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'fetch',
          jobPostingId,
          shopkeeperId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const acceptedIds = data.acceptedApplicants.map(app => app.labour_id);
        setAcceptedApplicants(acceptedIds);

        setRemainingApplicants(applicants.filter(applicantId => !acceptedIds.includes(applicantId)));
      }
    };

    fetchAcceptedApplicants();
  }, [jobPostingId, shopkeeperId, applicants]);

  const handleAction = async (action, applicantId) => {
    try {
      const response = await fetch('/api/accept-reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          applicantId,
          jobPostingId,
          shopkeeperId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);

        setRemainingApplicants((prev) => prev.filter((id) => id !== applicantId));

        if (action === 'accept') {
          setAcceptedApplicants((prev) => [...prev, applicantId]);
        } else if (action === 'reject') {
          setRejectedApplicants((prev) => [...prev, applicantId]);
        }
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-secondary" onClick={onBack}>
            Back to Job Postings
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <h3 className="section-title">Pending Applicants</h3>
          {remainingApplicants.length > 0 ? (
            <ul className="list-group">
              {remainingApplicants.map((applicantId, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Applicant ID: {applicantId}</span>
                  <div>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleAction('accept', applicantId)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAction('reject', applicantId)}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending applicants.</p>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <h3 className="section-title">Accepted Applicants</h3>
          {acceptedApplicants.length > 0 ? (
            <ul className="list-group">
              {acceptedApplicants.map((applicantId, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Applicant ID: {applicantId}</span>
                  <span className="badge bg-success">Accepted</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No accepted applicants.</p>
          )}
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <h3 className="section-title">Rejected Applicants</h3>
          {rejectedApplicants.length > 0 ? (
            <ul className="list-group">
              {rejectedApplicants.map((applicantId, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Applicant ID: {applicantId}</span>
                  <span className="badge bg-danger">Rejected</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rejected applicants.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;
