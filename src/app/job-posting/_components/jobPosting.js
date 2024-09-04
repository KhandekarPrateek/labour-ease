'use client'

import React,{useEffect, useState} from "react"
const JobPosting=()=>{ 
  const [userID, setuserID] = useState(null);

  useEffect(() => {
   
      const storedData = localStorage.getItem('uniqueId');
      setuserID(storedData);
    
  }, []);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState('');
    const availableSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C++', 'C++', 'C++', 'C++', 'C++', 'C++', 'C++', 'C++'];
    const filteredSkills = availableSkills.filter(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
      );
    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSkills(prevSkills =>
          prevSkills.includes(value)
            ? prevSkills.filter(skill => skill !== value)
            : [...prevSkills, value]
        );
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const jobPost = { title, description, skills };
      console.log('Job Post:', jobPost);
      // Submit jobPost to your backend API
    };
  
    return(
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
               
                <a className="nav-link" href={`shopkeeper-profile?userID=${userID}`}> Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="job-posting">Add Jobs posting</a>
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
            {/* make it in page.css later */}
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => (
                <div className="form-check" key={skill}>
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={skill} 
                    id={skill} 
                    onChange={handleCheckboxChange}
                    checked={skills.includes(skill)}
                  />
                  <label className="form-check-label" htmlFor={skill}>
                    {skill}
                  </label>
                </div>
              ))
            ) : (
              <p>No skills found</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
       </>
    )
}
export default JobPosting