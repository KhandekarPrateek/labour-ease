'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function JobPostingsAndApplicantsList() {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shopkeeperId, setShopkeeperId] = useState('');

  useEffect(() => {
    const storedShopkeeperId = localStorage.getItem('shopkeeperId');
    if (storedShopkeeperId) {
      setShopkeeperId(storedShopkeeperId);
      fetchJobPostingsAndApplicants(storedShopkeeperId);
    }
  }, []);

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
        console.error('Failed to fetch data:', errorData);
        toast.error(`Failed to fetch data. Error: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="job-postings-and-applicants-list">
      <h2 className="text-2xl font-bold mb-4">Job Postings and Applicants</h2>
      <div className="mb-4">
        <input
          type="text"
          value={shopkeeperId}
          onChange={(e) => setShopkeeperId(e.target.value)}
          placeholder="Enter Shopkeeper ID"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={() => fetchJobPostingsAndApplicants(shopkeeperId)}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>
      {jobPostings.length > 0 ? (
        <div className="space-y-6">
          {jobPostings.map((posting) => (
            <div key={posting.job_posting_id} className="border rounded p-4 shadow">
              <h3 className="text-xl font-semibold mb-2">
                Job Posting ID: {posting.job_posting_id} - {posting.job_title}
              </h3>
              <h4 className="text-lg font-medium mb-2">Applicants:</h4>
              {posting.applicants.length > 0 ? (
                <ul className="list-disc list-inside">
                  {posting.applicants.map((applicantId) => (
                    <li key={applicantId} className="text-gray-600">
                      Applicant ID: {applicantId}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No applicants for this job posting yet.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No job postings found.</p>
      )}
    </div>
  );
}