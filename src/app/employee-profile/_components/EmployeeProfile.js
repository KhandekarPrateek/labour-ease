"use client";
import React, { useState, useEffect, useId } from 'react';
import "../page.css";
import { useSearchParams } from 'next/navigation';


const EmployeeProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null); // Initialize profile as null
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const searchParams = useSearchParams();
  const userID = searchParams.get('userID');
  console.log(userID);


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/updateLabour?id=${userID}`); // Adjusted for initial fetch
        console.log(response);
        console.log(userID);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchEmployeeData();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const response = await fetch("/api/updateLabour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setProfile(data.data);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    ); // Display the spinner while loading
  }

  if (!profile) {
    return <div>No profile data available.</div>; // Fallback in case the profile is still null
  }

  return (
    <div className={`background-container ${isEditing ? 'blurred' : ''} d-flex align-items-center justify-content-center vh-100`}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        <h2 className="card-title text-center mb-4">{isEditing ? 'Edit Employee Profile' : 'Employee Profile'}</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={profile.name}
                onChange={handleChange}
                required={true} // Added required attribute
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={profile.phone}
                onChange={handleChange}
                required={true} // Added required attribute
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address:</label>
              <textarea
                name="address"
                className="form-control"
                value={profile.address}
                onChange={handleChange}
                required={true} // Added required attribute
                style={{ borderRadius: '10px' }}
                rows={3}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Experience:</label>
              <textarea
                name="experience"
                className="form-control"
                value={profile.experience}
                onChange={handleChange}
                required={true} // Added required attribute
                style={{ borderRadius: '10px' }}
                rows={3}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px' }}>
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
                style={{ borderRadius: '10px' }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-muted"><strong>Name:</strong> {profile.name}</p>
            <p className="text-muted"><strong>Phone:</strong> {profile.phone}</p>
            <p className="text-muted"><strong>Address:</strong> {profile.address}</p>
            <p className="text-muted"><strong>Experience:</strong> {profile.experience}</p>

            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
                style={{ borderRadius: '10px' }}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfilePage;