"use client";
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './shopkeeperDashboard.css';

const ShopkeeperDashboard = () => {
    const searchParams = useSearchParams();
    const userID = searchParams.get('userID');

    const router = useRouter();

    // Handle logout functionality
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

    // Job Dashboard State and Logic
    const [filter, setFilter] = useState("all");

    // Array of job postings
    const jobPostings = [
        { id: 1, name: "Cashier", dueDate: "2024-09-20", applicants: 10 },
        { id: 2, name: "Inventory Manager", dueDate: "2024-09-18", applicants: 5 },
        { id: 3, name: "Sales Associate", dueDate: "2024-09-25", applicants: 12 },
        { id: 4, name: "Store Manager", dueDate: "2024-10-01", applicants: 8 },
        { id: 5, name: "Security Guard", dueDate: "2024-09-30", applicants: 3 },
        { id: 6, name: "Customer Service", dueDate: "2024-09-13", applicants: 15 },
        { id: 7, name: "Stock Clerk", dueDate: "2024-09-28", applicants: 7 },
        { id: 8, name: "Delivery Driver", dueDate: "2024-09-27", applicants: 6 },
        { id: 9, name: "Merchandiser", dueDate: "2024-09-8", applicants: 9 },
        { id: 10, name: "Assistant Manager", dueDate: "2024-10-05", applicants: 4 },
        { id: 11, name: "Cleaner", dueDate: "2024-09-23", applicants: 11 },
        { id: 12, name: "Cashier Supervisor", dueDate: "2024-10-10", applicants: 2 }
    ];

    // Function to calculate date differences in days from the current date
    const getDateDifferenceInDays = (dueDate) => {
        const currentDate = new Date();
        const jobDueDate = new Date(dueDate);
        const timeDiff = jobDueDate - currentDate;
        return Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    };

    // Apply filters based on selected filter criteria
    const filteredJobs = jobPostings.filter((job) => {
        const daysDifference = getDateDifferenceInDays(job.dueDate);

        if (filter === "old") {
            // Jobs with a due date more than 30 days ago
            return daysDifference >= 30;
        }
        if (filter === "new") {
            // Jobs with a due date between 3-10 days from now
            return daysDifference >= 5 && daysDifference <= 10;
        }
        if (filter === "recent") {
            // Jobs with a due date between 1-2 days from now
            return daysDifference >= 0 && daysDifference <= 5;
        }
        return true; // Return all jobs for 'all' filter
    });
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href={`/shopkeeper-dashboard?userID=${userID}`}>Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={`/shopkeeper-profile?userID=${userID}`}>Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/job-posting">Add Job Posting</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/job-openings">See current opening</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/test">Test</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Job Dashboard */}
            <div className="container mt-4">
                <div className="dashboard-header d-flex justify-content-between align-items-center mb-3">
                    <h2>Total Job Postings: {jobPostings.length}</h2>
                    <div className="filter">
                        <label>Filter By: </label>
                        <select onChange={(e) => setFilter(e.target.value)} className="ms-2">
                            <option value="all">All Posts</option>
                            <option value="new">New</option>
                            <option value="old">Old</option>
                            <option value="recent">Recent</option>
                        </select>
                    </div>
                </div>

                <div className="job-cards">
                    {filteredJobs.map((job) => (
                        <div key={job.id} className="job-card d-flex justify-content-between align-items-center p-3 mb-2 border rounded">
                            <div className="job-name">{job.name}</div>
                            <div className="job-details">
                                <div>Due Date: {job.dueDate}</div>
                                <div>Applicants: {job.applicants}</div>
                            </div>
                            <div className="view-button">
                                <button className="btn btn-primary">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShopkeeperDashboard;
