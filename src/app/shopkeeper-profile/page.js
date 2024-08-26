"use client";

import React, { useState } from 'react';
import './page.css'; 


const ShopkeeperProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    shopName: "John's Shop",

    email: 'john.shop@example.com',
    address: '123 Shop Street, Shop City',

    bio: "A short bio about John's Shop.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Profile updated:", profile);

    // try {
    //   const response = await fetch("/api/updateProfile", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     toast.success(data.message);
    //   } else {
    //     const errorData = await response.json();
    //     toast.error(errorData.message);
    //   }
    // } catch (error) {
    //   toast.error("Failed to login");
    // }
  };

  return (
    <div className={`background-container ${isEditing ? 'blurred' : ''} d-flex align-items-center justify-content-center vh-100`}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        <h2 className="card-title text-center mb-4">
          {isEditing ? 'Edit Shop Profile' : 'Shop Profile'}
        </h2>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                name="shopName"
                className="form-control"
                value={profile.shopName}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
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
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={profile.address}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Bio</label>
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
            <p className="text-muted"><strong>Shop Name:</strong> {profile.shopName}</p>
            <p className="text-muted"><strong>Email:</strong> {profile.email}</p>
            <p className="text-muted"><strong>Address:</strong> {profile.address}</p>
            <p className="text-muted"><strong>Bio:</strong> {profile.bio}</p>

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

export default ShopkeeperProfilePage;
