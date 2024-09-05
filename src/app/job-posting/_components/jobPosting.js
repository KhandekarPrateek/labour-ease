'use client';

import React, { useEffect, useState } from "react";
import { skillsData } from "@/app/skillsDatabase";
import toast from "react-hot-toast";  // Import react-hot-toast

const JobPosting = () => {
  const [userID, setUserID] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  useEffect(() => {
    const storedData = localStorage.getItem('uniqueId');
    setUserID(storedData);
  }, []);

  const filteredSkills = skillsData.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value);
    setSkills(prevSkills =>
      prevSkills.includes(value)
        ? prevSkills.filter(skillId => skillId !== value)
        : [...prevSkills, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when submit is clicked
    toast.loading("Loading...");  // Show loading toast

    const jobPost = { title, description, skills, userID };
    try {
      const response = await fetch('/api/job_posting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobPost),
      });
      const data = await response.json();

      toast.dismiss();  // Dismiss the loading toast
      if (response.ok) {
        toast.success('Job posting created successfully!');
        console.log('Job posting created:', data);
        // Handle successful creation (e.g., show a success message, redirect)
      } else {
        toast.error(data.message || 'Error creating job posting');
        console.error('Error creating job posting:', data.message);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      toast.dismiss();  // Dismiss the loading toast
      toast.error('Failed to create job posting');
      console.error('Error:', error);
      // Handle network errors
    } finally {
      setLoading(false);  // Set loading to false after response is received
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href={`shopkeeper-dashboard?userID=${userID}`}>Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`shopkeeper-profile?userID=${userID}`}>Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="job-posting">Add Jobs Posting</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <h2>Create Job Posting</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Job Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="skills" className="form-label">Search and Select Skills</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search for skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ced4da', padding: '10px' }}
            >
              {filteredSkills.length > 0 ? (
                filteredSkills.map(skill => (
                  <div className="form-check" key={skill.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={skill.id}
                      id={`skill-${skill.id}`}
                      onChange={handleCheckboxChange}
                      checked={skills.includes(skill.id)}
                    />
                    <label className="form-check-label" htmlFor={`skill-${skill.id}`}>
                      {skill.name}
                    </label>
                  </div>
                ))
              ) : (
                <p>No skills found</p>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default JobPosting;
