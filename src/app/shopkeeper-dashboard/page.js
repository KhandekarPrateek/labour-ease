"use client";
import React from "react";

import { useSearchParams } from 'next/navigation'
const ShopkkeeperDashboardPage = () => {
    const searchParams = useSearchParams();
    const userID = searchParams.get('userID');
    console.log(userID);  // This should log the userID from the query parameters
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
                {/* ///shopkeeper-dashboard?userID=${data.userID} */}
                <a className="nav-link" href={`shopkeeper-profile?userID=${userID}`}> Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h1>Hiii, welcome to Shopkeeper Dashboard</h1>
      </div>
    </>
  );
};

export default ShopkkeeperDashboardPage;
