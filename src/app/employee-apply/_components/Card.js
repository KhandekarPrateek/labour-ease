'use client';
import React, { useState } from 'react';
import './Card.css';
import { toast } from 'react-hot-toast';

export default function Card({ job }) {
  const [showModal, setShowModal] = useState(false);

  const handleApply = () => {
    toast.success('Job Applied Successfully!');
    setShowModal(false); 
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
              <button type="button" className="btn btn-primary" onClick={handleApply}>
                Apply for Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
