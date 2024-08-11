import React from 'react';
import Jobs from './Jobs';
import jobsData from './jobsData';

export default function JobSlider() {
  return (
    <div className="job-slider">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div id="jobCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {jobsData.map((job, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <Jobs {...job} /> 
                  </div>
                ))}
              </div>
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  padding: '10px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  zIndex: 1
                }}
                type="button"
                data-bs-target="#jobCarousel"
                data-bs-slide="prev"
              >
                <span aria-hidden="true">&lsaquo;</span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  padding: '10px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  zIndex: 1
                }}
                type="button"
                data-bs-target="#jobCarousel"
                data-bs-slide="next"
              >
                <span aria-hidden="true">&rsaquo;</span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}