'use client';
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import "./employeeNavbar.css"
const EmployeeNavbar=()=>{
      const searchParams = useSearchParams();
  const userID = searchParams.get("userID");
  const router = useRouter();
  const handleLogout = async () => {
    localStorage.clear();
    try {
      const response = await fetch("/api/logoutLabour", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
    return (
        <nav className="dashboard-navbar navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href={`/employee-dashboard?userID=${userID}`}>
            Dashboard 
            
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
             
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={`/employee-profile?userID=${userID}`}
                >
                  My Profile
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li> */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={`/employee-apply?userID=${userID}`}
                >
                  Apply for Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/view-rate?userID=${userID}`}>
                  Your Ratings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default EmployeeNavbar;