'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import './JobData.css';
import toast from 'react-hot-toast';

const JobData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  // State for search input
  const [filteredJobs, setFilteredJobs] = useState([]);  // State for filtered jobs

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
        setFilteredJobs(data.jobs);  // Initialize filtered jobs
      } catch (error) {
        toast.error('Failed to fetch job postings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the search term
  useEffect(() => {
    const results = jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Convert skills to a string and check if any skills match the search term
      const skillsMatch = Array.isArray(job.skills)
        ? job.skills.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
        : job.skills?.toLowerCase().includes(searchTerm.toLowerCase());

      return titleMatch || skillsMatch;
    });

    setFilteredJobs(results);
  }, [searchTerm, jobs]);

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

      {/* Search Bar */}
      <div className="search-bar mb-4 text-center">
        <input
          type="text"
          placeholder="Search by job title or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        />
      </div>

      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
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
