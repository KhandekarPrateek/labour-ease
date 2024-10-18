"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ViewApplicants from './ViewApplicants';
import './shopkeeperDashboard.css';

const ShopkeeperDashboard = () => {
    const searchParams = useSearchParams();
    const userID = searchParams.get('userID');
    const router = useRouter();

    const [jobPostings, setJobPostings] = useState([]);
    const [reviews, setReviews] = useState([]); // State for shopkeeper reviews
    const [loading, setLoading] = useState(false);
    const [shopkeeperId, setShopkeeperId] = useState('');
    const [filter, setFilter] = useState("all");
    const [viewApplicants, setViewApplicants] = useState(null); // State for selected applicants and job posting ID

    useEffect(() => {
        const storedShopkeeperId = searchParams.get('userID');
        if (storedShopkeeperId && storedShopkeeperId !== shopkeeperId) {
            setShopkeeperId(storedShopkeeperId);
            fetchJobPostingsAndApplicants(storedShopkeeperId);
            fetchShopkeeperReviews(storedShopkeeperId); // Fetch reviews
        }
    }, [searchParams, shopkeeperId]);

    const fetchJobPostingsAndApplicants = async (id) => {
        setLoading(true);
        const toastId = toast.loading('Fetching data...');

        try {
            const response = await fetch('/api/listLabours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shopkeeper_id: id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setJobPostings(data.job_postings);
                toast.success('Data fetched successfully!');
            } else {
                const errorData = await response.json();
                toast.error(`Failed to fetch data. Error: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };

    // New function to fetch reviews for the shopkeeper
    const fetchShopkeeperReviews = async (shopkeeperId) => {
        try {
            const response = await fetch('/api/shopkeeper-reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shopkeeper_id: shopkeeperId }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Reviews:', data.reviews);
                setReviews(data.reviews); // Update the reviews state here
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };
    
    
    

    // Handle viewing applicants for a job posting
    const handleViewApplicants = (job) => {
        setViewApplicants({ applicants: job.applicants, jobPostingId: job.job_posting_id });
    };

    const handleBackToJobs = () => {
        setViewApplicants(null); // Go back to job postings
    };

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

    const getDateDifferenceInDays = (dueDate) => {
        const currentDate = new Date();
        const jobDueDate = new Date(dueDate);
        const timeDiff = jobDueDate - currentDate;
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    };

    const filteredJobs = jobPostings.filter((job) => {
        const daysDifference = getDateDifferenceInDays(job.due_date);

        if (filter === "old") {
            return daysDifference >= 30;
        }
        if (filter === "new") {
            return daysDifference >= 5 && daysDifference <= 10;
        }
        if (filter === "recent") {
            return daysDifference >= 0 && daysDifference <= 5;
        }
        return true;
    });

    return (
        <>
            {viewApplicants ? (
                <ViewApplicants 
                    applicants={viewApplicants.applicants} 
                    onBack={handleBackToJobs} 
                    jobPostingId={viewApplicants.jobPostingId} 
                    shopkeeperId={userID} 
                />
            ) : (
                <>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href={`/shopkeeper-dashboard?userID=${userID}`}>Dashboard</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                                    <li className="nav-item"><a className="nav-link" href={`/shopkeeper-profile?userID=${userID}`}>Profile</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/job-posting">Add Job Posting</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/job-openings">See current openings</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#" onClick={handleLogout}>Logout</a></li>
                                    <li className="nav-item"><a className="nav-link" href={`/rate-labours?userID=${userID}`}>rate-labour</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

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
                            {loading ? (
                                <p>Loading job postings...</p>
                            ) : filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div key={job.job_posting_id} className="job-card d-flex justify-content-between align-items-center p-3 mb-2 border rounded">
                                        <div className="job-name">{job.job_title}</div>
                                        <div className="job-details">
                                            <div>Due Date: {job.due_date}</div>
                                            <div>Applicants: {job.applicants.length}</div>
                                        </div>
                                        <div className="view-button">
                                            <button 
                                                className="btn btn-primary" 
                                                onClick={() => handleViewApplicants(job)}
                                            >
                                                View Applicants
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No job postings found.</p>
                            )}
                        </div>

                        {/* Section to display reviews */}
                        <div className="reviews-section mt-4">
                            <h3>Reviews from Labours</h3>
                            {reviews.length > 0 ? (
    <ul className="list-group">
        {reviews.map((review) => (
            <li key={review.id} className="list-group-item">
                <strong>Rating: {review.rating}</strong>
                <p>{review.review}</p>
            </li>
        ))}
    </ul>
) : (
    <p>No reviews available.</p>
)}

                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ShopkeeperDashboard;
