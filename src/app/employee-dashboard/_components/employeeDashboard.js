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
  const [shopkeepers, setShopkeepers] = useState([]); // State for shopkeepers
  const [reviews, setReviews] = useState([]); // State for shopkeeper reviews
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

    const fetchShopkeepers = async () => {
      try {
        const response = await fetch('/api/shopkeepers'); // Fetch shopkeepers data from your API
        if (response.ok) {
          const data = await response.json();
          setShopkeepers(data);
          // Initialize reviews state for each shopkeeper
          setReviews(data.map(shopkeeper => ({ id: shopkeeper.id, rating: 0, review: '' })));
        } else {
          console.error('Failed to fetch shopkeepers');
        }
      } catch (error) {
        console.error('Error fetching shopkeepers:', error);
      }
    };

    fetchEmployeeData();
    fetchShopkeepers(); // Fetch shopkeepers when the component mounts
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

  const handleReviewChange = (shopkeeperId, field, value) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === shopkeeperId ? { ...review, [field]: value } : review
      )
    );
  };

  const handleReviewSubmit = async (shopkeeperId) => {
    const currentReview = reviews.find(review => review.id === shopkeeperId);
    if (!currentReview) return; // Handle if review not found

    try {
      const response = await fetch('/api/submitReview', { // Adjust this endpoint as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopkeeperId,
          labourId: userID,
          rating: currentReview.rating,
          review: currentReview.review,
        }),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        // Reset the specific shopkeeper's review state after submission
        handleReviewChange(shopkeeperId, 'rating', 0);
        handleReviewChange(shopkeeperId, 'review', ''); 
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
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

        {/* Section to list shopkeepers and submit ratings/reviews */}
        <h2>Rate and Review Shopkeepers</h2>
        {shopkeepers.length === 0 ? (
          <p>No shopkeepers available.</p>
        ) : (
          <ul>
            {shopkeepers.map(shopkeeper => (
              <li key={shopkeeper.id}>
                <h3>{shopkeeper.shop_name}</h3>
                <div>
                  <label>Rating (1-5): </label>
                  <input
                    type="number"
                    value={reviews.find(review => review.id === shopkeeper.id)?.rating || 0} // Get specific shopkeeper rating
                    onChange={(e) => handleReviewChange(shopkeeper.id, 'rating', Number(e.target.value))}
                    min="1"
                    max="5"
                  />
                </div>
                <div>
                  <label>Review: </label>
                  <textarea
                    value={reviews.find(review => review.id === shopkeeper.id)?.review || ''} // Get specific shopkeeper review
                    onChange={(e) => handleReviewChange(shopkeeper.id, 'review', e.target.value)}
                  />
                </div>
                <button onClick={() => handleReviewSubmit(shopkeeper.id)}>Submit Review</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EmpDashboardPage;
