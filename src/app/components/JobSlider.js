'use client';
import React, { useState, useEffect } from 'react';
import Jobs from './Jobs';
import './JobSlider.css';

export default function JobSlider() {
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/getJobPostings');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setJobsData(data.jobs || []); // Ensure fallback to an empty array
      } catch (error) {
        console.error('Error fetching job postings:', error);
        setJobsData([]); // Prevent undefined issues
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-slider">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              id="jobCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000" // Automatically slides every 3 seconds
            >
              <div className="carousel-inner">
                {Array.isArray(jobsData) &&
                  jobsData.map((job, index) => (
                    <div
                      key={job.job_id}
                      className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                      <Jobs {...job} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
