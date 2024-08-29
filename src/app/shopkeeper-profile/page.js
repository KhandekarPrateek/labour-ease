"use client";

import React, { useState, useEffect } from 'react';
import './page.css';

const ShopkeeperProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: 299,
    shop_name: "John's Shop",
    shop_address: '123 Shop Street, Shop City',
    shop_phone: '9102934241',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    const fetchShopkeeperData = async () => {
      try {
        const response = await fetch(`/api/updateShopkeeper?id=${profile.id}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch shopkeeper data');
        }
      } catch (error) {
        console.error('Error fetching shopkeeper data:', error);
      }
    };
  
    fetchShopkeeperData();
  }, [profile.id]);

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
  
    try {
      const response = await fetch("/api/updateShopkeeper", {
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
                name="shop_name"
                className="form-control"
                value={profile.shop_name}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shop Address</label>
              <textarea
                name="shop_address"
                className="form-control"
                value={profile.shop_address}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shop Phone</label>
              <input
                type="tel"
                name="shop_phone"
                className="form-control"
                value={profile.shop_phone}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
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
            <p className="text-muted"><strong>Shop Name:</strong> {profile.shop_name}</p>
            <p className="text-muted"><strong>Shop Address:</strong> {profile.shop_address}</p>
            <p className="text-muted"><strong>Shop Phone:</strong> {profile.shop_phone}</p>
            <p className="text-muted"><strong>Created At:</strong> {new Date(profile.created_at).toLocaleString()}</p>
            <p className="text-muted"><strong>Last Updated:</strong> {new Date(profile.updated_at).toLocaleString()}</p>

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