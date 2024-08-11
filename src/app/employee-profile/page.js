"use client"
import React, { useState } from 'react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    bio: 'A short bio about John Doe.',
    skills : 'skills will ve added here'
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
    <div className="container mt-4">
      {isEditing ? (
        <div className="card p-4">
          <h2 className="card-title">Edit Profile</h2>
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
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="card p-4">
          <h2 className="card-title">Profile</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Skills:</strong> {profile.skills}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
