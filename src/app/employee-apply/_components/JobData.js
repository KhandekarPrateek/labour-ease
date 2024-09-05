'use client'; // Correct directive for client-side components

import React, { useEffect, useState } from 'react';
import Card from './Card';
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
    return <p>Loading job postings...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Available Job Postings</h2>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="col-md-4">
              <Card job={job} />
            </div>
          ))
        ) : (
          <p>No job postings available</p>
        )}
      </div>
    </div>
  );
};

export default JobData;
