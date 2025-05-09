"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./employeeDashboard.css";
import EmployeeNavbar from "@/app/employee-navbar/EmployeeNavbar";

const EmpDashboardPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get("userID");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shopkeepers, setShopkeepers] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/updateLabour?id=${userID}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchEmployeeData();
    } else {
      console.error("No userID provided");
    }
  }, [userID]);

    const handleReviewChange = (shopkeeperId, field, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === shopkeeperId ? { ...review, [field]: value } : review
      )
    );
  };

  const handleReviewSubmit = async (shopkeeperId) => {
    const currentReview = reviews.find((review) => review.id === shopkeeperId);
    if (!currentReview) return;

    try {
      const response = await fetch("/api/submitReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopkeeperId,
          labourId: userID,
          rating: currentReview.rating,
          review: currentReview.review,
        }),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        handleReviewChange(shopkeeperId, "rating", 0);
        handleReviewChange(shopkeeperId, "review", "");
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-spinner-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <>
    
    <EmployeeNavbar/>
      <div className="dashboard-container">
        <h1 className="dashboard-welcome">Welcome {profile.name}</h1>
        <div className="dashboard-shopkeepers">
          <h2>Rate and Review Shopkeepers</h2>
          {shopkeepers.length === 0 ? (
            <p>No shopkeepers available.</p>
          ) : (
            <ul>
              {shopkeepers.map((shopkeeper) => (
                <li key={shopkeeper.id}>
                  <h3>{shopkeeper.shop_name}</h3>
                  <div>
                    <label className="dashboard-form-label">
                      Rating (1-5):
                    </label>
                    <input
                      className="dashboard-form-input"
                      type="number"
                      value={
                        reviews.find((review) => review.id === shopkeeper.id)
                          ?.rating || 0
                      }
                      onChange={(e) =>
                        handleReviewChange(
                          shopkeeper.id,
                          "rating",
                          Number(e.target.value)
                        )
                      }
                      min="1"
                      max="5"
                    />
                  </div>
                  <div>
                    <label className="dashboard-form-label">Review:</label>
                    <textarea
                      className="dashboard-form-textarea"
                      value={
                        reviews.find((review) => review.id === shopkeeper.id)
                          ?.review || ""
                      }
                      onChange={(e) =>
                        handleReviewChange(shopkeeper.id, "review", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="dashboard-btn"
                    onClick={() => handleReviewSubmit(shopkeeper.id)}
                  >
                    Submit Review
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpDashboardPage;
