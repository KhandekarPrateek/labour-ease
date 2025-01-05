'use client';
import React, { useState, useEffect } from 'react';
import "./shopkeeperProfile.css"
import { useSearchParams } from 'next/navigation';
import { 
  Store, 
  MapPin, 
  Phone, 
  FileText, 
  Edit 
} from 'lucide-react';
import ShopkeeperNavbar from '@/app/ShopkeeperNavbar/ShopkeeperNavbar';

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
    <ShopkeeperNavbar/>
    <div className="background-container">
      <div className="card">
        {/* Default View */}
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-initials">
              {getInitials(profile.shop_name)}
            </div>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <Store className="info-icon" />
              <p className="info-label">Shop Name</p>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <p className="info-label">Shop Address</p>
            </div>
            <div className="info-item">
              <Phone className="info-icon" />
              <p className="info-label">Shop Phone</p>
            </div>
            <div className="info-item">
              <FileText className="info-icon" />
              <p className="info-label">Bio</p>
            </div>
          </div>
        </div>

        {/* Hover Content */}
        <div className="profile-content">
          <div className="content-section">
            <h3 className="content-heading">
              <Store size={20} />
              Shop Name
            </h3>
            <p className="content-text">{profile.shop_name}</p>
          </div>
          
          <div className="content-section">
            <h3 className="content-heading">
              <MapPin size={20} />
              Shop Address
            </h3>
            <p className="content-text">{profile.shop_address}</p>
          </div>
          
          <div className="content-section">
            <h3 className="content-heading">
              <Phone size={20} />
              Shop Phone
            </h3>
            <p className="content-text">{profile.shop_phone}</p>
          </div>
          
          <div className="content-section">
            <h3 className="content-heading">
              <FileText size={20} />
              Bio
            </h3>
            <p className="content-text">{profile.bio}</p>
          </div>

          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <Edit size={20} />
            Edit Profile
          </button>
        </div>

        {/* Edit Form Modal */}
        {isEditing && (
          <>
        <div className="modal-backdrop show" onClick={() => setIsEditing(false)} />
          <div className="edit-form show" onClick={e => e.stopPropagation()}>
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

                <div className="form-buttons">
                  <button type="submit" className="edit-button">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setIsEditing(false)}
                    style={{ backgroundColor: '#6c757d' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default ShopkeeperProfilePage;