"use client";
import React from "react";
import JobData from "./JobData";


export default function AllJobs() {
  const columnStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack cards vertically
    alignItems: 'flex-end', // Align items to the right within the column
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Labour Ease
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container">
        <div className="row">
          <div className="col" style={columnStyle}>
            <JobData />
          </div>
          <div className="col">
            <JobData />
          </div>
        </div>
      </div>
    </>
  );
}
