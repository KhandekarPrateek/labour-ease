import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./JobSlider.css";

const JobPostingsSlider = () => {
  const router = useRouter();
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/getJobPostings");
        const data = await response.json();

        if (data && data.jobs && Array.isArray(data.jobs)) {
          setJobPostings(data.jobs);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching job postings:", error);
        setError("Failed to fetch job postings");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const handleApplyClick = () => {
    router.push("/login");
  };

  const handleReadMore = (job) => {
    setExpandedJob(job);
  };

  const closeModal = () => {
    setExpandedJob(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job postings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {jobPostings.map((job) => (
          <div key={job.job_id} className="job-slide">
            <div className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-description">
                {job.description.length > 300
                  ? `${job.description.substring(0, 300)}...`
                  : job.description}
              </p>
              <div className="button-container">
                <button
                  onClick={handleApplyClick}
                  className="custom-button apply-button"
                >
                  Apply Now
                </button>
                {job.description.length > 300 && (
                  <button
                    onClick={() => handleReadMore(job)}
                    className="custom-button read-more-button"
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {expandedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content slide-in-bck-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{expandedJob.title}</h2>
            <p>{expandedJob.description}</p>
            <button onClick={closeModal} className="custom-button close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingsSlider;
