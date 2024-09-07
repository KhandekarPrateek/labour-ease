"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import "./employeeDashboard.css"; 

const EmpDashboardPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get('userID');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/updateLabour?id=${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [userID]);

  const handleLogout = async () => {
    localStorage.clear();
    try {
      const response = await fetch('/api/logoutLabour', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
  <a className="navbar-brand" href="#">Dashboard</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href={`/employee-profile?userID=${userID}`}>My Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Settings</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href={`/employee-apply?userID=${userID}`}>Apply for Jobs</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
      </li>
    </ul>
  </div>
</div>
</nav>


      <div className="col-md-8">
            <h1>Welcome {profile.name}</h1>
          </div>
    </>
  );
};

export default EmpDashboardPage;
