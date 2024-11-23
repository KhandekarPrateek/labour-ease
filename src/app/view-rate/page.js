"use client";

import React, { Suspense } from "react";
import ViewRatings from "./_components/ViewRatings";

const ViewRatePage = () => {
  return (
<<<<<<< HEAD
    <div className="ratings-container">
      <div className="ratings-inner-container">
        <h2>Your Ratings and Reviews</h2>

        {loading ? (
          <p>Loading your ratings...</p>
        ) : ratings.length > 0 ? (
          <ul className="ratings-list">
            {ratings.map((rating, index) => (
              <li key={index} className="rating-card">
                <div className="rating-info">
                  <h5>Shopkeeper: {rating.shopkeeper_name}</h5>
                  <p>Rating: {rating.rating}/5</p>
                  <p>Review: {rating.review}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-ratings">No ratings found.</p>
        )}
      </div>
    </div>
=======
    <Suspense fallback={<p>Loading...</p>}>
      <ViewRatings />
    </Suspense>
>>>>>>> 6cf7629e40069c28da96dd6473a0705232e00d80
  );
};

export default ViewRatePage;
