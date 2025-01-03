'use client';

import React, { useState, useEffect } from 'react';
import './Card.css';
import { toast } from 'react-hot-toast';

export default function Card({ job, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUniqueId = localStorage.getItem('uniqueId');
    if (storedUniqueId) {
      setUniqueId(storedUniqueId);
    }
  }, []);

  const handleApply = async () => {
    if (!uniqueId) {
      toast.error('User ID not found. Please log in.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Loading...');

    try {
      const response = await fetch('/api/applyJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job.id,
          labourId: uniqueId,
        }),
      });

      if (response.ok) {
        toast.success('Job Applied Successfully!');
        setShowModal(false);
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          toast.error('You have already applied for this job.');
        } else {
          toast.error(`Failed to apply. Error: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="d-flex align-items-stretch">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text text-truncate overflow-hidden" style={{ maxHeight: '4.5em' }}>
            {job.description}
          </p>
          <div className="mt-auto">
            <button className="btn btn-primary w-100" onClick={() => setShowModal(true)}>
              View Details
            </button>
          </div>
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(job.id)}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
