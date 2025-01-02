'use client';
import React, { useState, useEffect, useCallback } from 'react';
import './JobSlider.css';

export default function JobSlider() {
  const [jobsData, setJobsData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/getJobPostings');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (!data?.jobs || !Array.isArray(data.jobs)) {
        throw new Error('Invalid data format');
      }

      setJobsData(data.jobs);
      setError(null);
    } catch (error) {
      setError(error.message);
      setJobsData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (!jobsData.length) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % jobsData.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [jobsData.length]);

  const handleSlideChange = useCallback((direction) => {
    setCurrentSlide(prev => {
      const newSlide = direction === 'prev' 
        ? (prev - 1 + jobsData.length) % jobsData.length
        : (prev + 1) % jobsData.length;
      return newSlide;
    });
  }, [jobsData.length]);

  if (isLoading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!jobsData.length) return <div className="no-data">No jobs available</div>;

  const currentJob = jobsData[currentSlide];

  return (
    <div className="job-slider">
      <div className="carousel">
        <div className="carousel-inner">
          {jobsData.map((job, index) => (
            <div
              key={job.job_id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
              style={{
                display: index === currentSlide ? 'block' : 'none',
                opacity: 1
              }}
            >
              <div className="job-content">
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                {job.skills && <p className="skills">Skills: {job.skills}</p>}
              </div>
            </div>
          ))}
        </div>
        <button 
          className="carousel-control prev" 
          onClick={() => handleSlideChange('prev')}
        >
          &larr;
        </button>
        <button 
          className="carousel-control next" 
          onClick={() => handleSlideChange('next')}
        >
          &rarr;
        </button>
        <div className="carousel-indicators">
          {jobsData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}