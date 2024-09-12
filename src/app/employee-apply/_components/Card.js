'use client';
import React, { useState, useEffect } from 'react';
import './Card.css';
import { toast } from 'react-hot-toast';

export default function Card({ job }) {
  const [showModal, setShowModal] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    // Retrieve uniqueId from localStorage when the component mounts
    const storedUniqueId = localStorage.getItem('uniqueId');
    console.log(job);
    console.log(storedUniqueId);
    if (storedUniqueId) {
      setUniqueId(storedUniqueId);
    }
  }, []);

  const handleApply = async () => {
    if (!uniqueId) {
      toast.error('User ID not found. Please log in.');
      return;
    }

    setLoading(true); // Set loading to true when the request starts
    const toastId = toast.loading('Loading...'); // Show loading toast

    try {
      const response = await fetch('/api/applyJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job.job_id, // Ensure job.id exists and is valid
          labourId: uniqueId, // Ensure uniqueId exists and is valid
        }),
      });

      if (response.ok) {
        toast.success('Job Applied Successfully!');
        setShowModal(false);
      } else {
        const errorData = await response.json(); // Get error details from the response
        console.error('Failed to apply for the job:', errorData);

        // Display a specific error message based on the backend response
        if (response.status === 409) {
          toast.error('You have already applied for this job.'); // Show a specific error message
        } else {
          toast.error(`Failed to apply for the job. Error: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when the request finishes
      toast.dismiss(toastId); // Dismiss loading toast
    }
  };

  return (
    <div className="job-card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text">{job.description}</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            View Details
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-container">
            <div className="modal-header">
              <h5 className="modal-title">{job.title}</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Skills Required:</strong> {job.skills}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleApply}
                disabled={loading} // Disable the button when loading
              >
                {loading ? 'Loading...' : 'Apply for Job'} {/* Show loading indicator */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
