'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const JobData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const uniqueId = localStorage.getItem('uniqueId');
        const response = await fetch(`/api/currentOpenings?shopkeeper_id=${uniqueId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        toast.error('Failed to fetch job postings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`/api/deleteJob`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the job');
      }
  
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      toast.success('Job posting deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job posting');
    }
  };
  

  if (loading) {
    return (
      <div className="spinner-container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading current openings...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 job-data-container">
      <h2 className="text-center mb-4">Available Job Postings</h2>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text">{job.description}</p>
                  <button 
                    className="btn btn-danger mt-3"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No job postings available</p>
        )}
      </div>
    </div>
  );
};

export default JobData;
