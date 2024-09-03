"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get('userID');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode

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

            const updatedResponse = await fetch(`/api/updateLabour?id=${userID}`);
            if (updatedResponse.ok) {
                const updatedData = await updatedResponse.json();
                setProfile(updatedData);

                // Redirect to the dashboard
                router.push('/dashboard');
            } else {
                console.error('Failed to fetch updated profile data');
            }
        } else {
            const errorData = await response.json();
            console.error(errorData.message);
        }
    } catch (error) {
        console.error("Failed to update profile", error);
    }
};


  const getInitials = (name) => {
    if (!name) return 'N/A';
    const firstInitial = name.charAt(0).toUpperCase();
    return firstInitial;
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-img-top rounded-circle mx-auto mt-3 d-flex align-items-center justify-content-center profile-initials">
                {profile.name ? getInitials(profile.name) : 'N/A'}
              </div>
              <div className="card-body text-center">
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
                        required
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
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address:</label>
                      <textarea
                        name="address"
                        className="form-control"
                        value={profile.address}
                        onChange={handleChange}
                        required
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
                        required
                        rows={3}
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h5 className="card-title">{profile.name}</h5>
                    <p className="card-text">{profile.phone}</p>
                    <p className="card-text">{profile.address}</p>
                    <p className="card-text">{profile.experience}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
