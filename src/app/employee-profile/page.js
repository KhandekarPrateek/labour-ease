"use client";
import React, { useState } from 'react';
import './page.css'; 

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    bio: 'A short bio about John Doe.',
    skills: 'skills will be added here',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Profile updated:', profile);
  };

  return (
    <div className={`background-container ${isEditing ? 'blurred' : ''} d-flex align-items-center justify-content-center vh-100`}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        <h2 className="card-title text-center mb-4">
          {isEditing ? 'Edit Profile' : 'Profile'}
        </h2>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={profile.username}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={profile.email}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Bio:</label>
              <textarea
                name="bio"
                className="form-control"
                value={profile.bio}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
                rows={3}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Skills:</label>
              <textarea
                name="skills"
                className="form-control"
                value={profile.skills}
                onChange={handleChange}
                required
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
            <p className="text-muted"><strong>Username:</strong> {profile.username}</p>
            <p className="text-muted"><strong>Email:</strong> {profile.email}</p>
            <p className="text-muted"><strong>Bio:</strong> {profile.bio}</p>
            <p className="text-muted"><strong>Skills:</strong> {profile.skills}</p>

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

export default ProfilePage;
