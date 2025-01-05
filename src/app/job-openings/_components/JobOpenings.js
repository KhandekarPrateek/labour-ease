'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from './Card';
import './jobOpenings.css';
import ShopkeeperNavbar from '@/app/ShopkeeperNavbar/ShopkeeperNavbar';

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

      <>
      <ShopkeeperNavbar/>
      <div className="spinner-container text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading current openings...</p>
      </div>
      </>
    );
  }

  return (
    <>
      <ShopkeeperNavbar/>

    <div className="container mt-5 job-data-container">
      <h2 className="text-center mb-4">Available Job Postings</h2>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="col-lg-4 col-md-6 mb-4">
              <Card job={job} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <p className="text-center">No job postings available</p>
        )}
      </div>
    </div>
    </>
  );
};

export default JobData;