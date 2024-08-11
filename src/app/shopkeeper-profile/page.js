"use client";
import React, { useState } from "react";

const ShopkeeperProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    shopName: "John's Shop",
    email: "john.shop@example.com",
    address: "123 Shop Street, Shop City",
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
    <div className="container mt-4">
      {isEditing ? (
        <div className="card p-4">
          <h2 className="card-title">Edit Shop Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Shop Name:</label>
              <input
                type="text"
                name="shopName"
                className="form-control"
                value={profile.shopName}
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
              <label className="form-label">Address:</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={profile.address}
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
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="card p-4">
          <h2 className="card-title">Shop Profile</h2>
          <p>
            <strong>Shop Name:</strong> {profile.shopName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperProfilePage;
