"use client";
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const ShopkeeperDashboard = () => {
    const searchParams = useSearchParams();
    const userID = searchParams.get('userID');

    const router = useRouter();

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

    return (
        <>
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
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
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

export default ShopkeeperDashboard;
