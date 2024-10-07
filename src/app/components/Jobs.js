import React from 'react';

export default function Jobs({ title, image, description }) {
  return (
    <div className="card mb-3" >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">
          Apply Now
        </a>
      </div>
    </div>
  );
}