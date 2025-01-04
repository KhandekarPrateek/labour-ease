"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import "./viewRatings.css"; // Add your custom styles here
import EmployeeNavbar from "@/app/employee-navbar/EmployeeNavbar";

const ViewRatings = () => {
  const searchParams = useSearchParams();
  const userID = searchParams.get("userID"); // This is the labourer ID

  const [ratings, setRatings] = useState([]); // State to hold ratings list
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch ratings for the labourer
  useEffect(() => {
    if (userID) {
      fetchRatingsForLabour(userID);
    }
  }, [userID]);

  const fetchRatingsForLabour = async (labourId) => {
    setLoading(true);
    const toastId = toast.loading("Fetching your ratings...");

    try {
      const response = await fetch("/api/getRatingsForLabour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          labour_id: labourId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRatings(data.ratings);
        toast.success("Ratings fetched successfully!");
      } else {
        toast.error(`Failed to fetch ratings: ${data.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while fetching ratings.");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <>
    <EmployeeNavbar/>
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
    </>

  );
};

export default ViewRatings;
