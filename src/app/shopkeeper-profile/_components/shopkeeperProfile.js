'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import './shopkeeperProfile.css';

const ShopkeeperProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const userID = searchParams.get('userID');

  useEffect(() => {
    const fetchShopkeeperData = async () => {
      try {
        const response = await fetch(`/api/updateShopkeeper?id=${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch shopkeeper data');
        }
      } catch (error) {
        console.error('Error fetching shopkeeper data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopkeeperData();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const response = await fetch('/api/updateShopkeeper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Failed to update profile', error);
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
  const getInitials = (name) => {
    if (!name) return 'N/A';
    const firstInitial = name.charAt(0).toUpperCase();
    return firstInitial;
  };

  return (
    <div className={`background-container ${isEditing ? 'blurred' : ''}`}>
      <div className="card shadow-sm p-4">
        <h2 className="card-title text-center mb-4">
        <div className="card-img-top rounded-circle mx-auto mt-3 d-flex align-items-center justify-content-center profile-initials">
                {profile.shop_name ? getInitials(profile.shop_name) : 'N/A'}
              </div>
          {isEditing ? 'Edit Shop Profile' : 'Shop Profile'}
        </h2>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
        
            <div className="mb-4">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                name="shop_name"
                className="form-control"
                value={profile.shop_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Shop Address</label>
              <textarea
                name="shop_address"
                className="form-control"
                value={profile.shop_address}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Shop Phone</label>
              <input
                type="tel"
                name="shop_phone"
                className="form-control"
                value={profile.shop_phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                value={profile.bio}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
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
            <p className="text-muted"><strong>Shop Name:</strong> {profile.shop_name}</p>
            <p className="text-muted"><strong>Shop Address:</strong> {profile.shop_address}</p>
            <p className="text-muted"><strong>Shop Phone:</strong> {profile.shop_phone}</p>
            <p className="text-muted"><strong>Bio:</strong> {profile.bio}</p>

            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
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
