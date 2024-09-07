'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import "./JobData.css"
import toast from 'react-hot-toast';

const JobData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/getJobPostings');
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

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
        <p>Loading job postings...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 job-data-container">
      <h2 className="text-center">Available Job Postings</h2>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="col-md-4 mb-4">
              <Card job={job} />
            </div>
          ))
        ) : (
          <p className="no-jobs text-center">No job postings available</p>
        )}
      </div>
    </div>
  );
};

export default JobData;
