import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <div className="highlight">
          FAQ
        </div>
      <footer
        className="footer  footer-dark"
        style={{padding:50}}
      >
       
        <div>
        
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What is LabourEase?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>LabbourEase is a platform that connects small scale shopkeepers with reliable and skilled labourers.</strong> Our platform aims to provide a convenient and efficient way for shopkeepers to find the right labourers for their business needs.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How do I find a labourer on LabourEase?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>To find a labourer on LabourEase, simply create an account, post a job requirement, and our platform will connect you with suitable labourers in your area.</strong> You can then browse through their profiles, check their ratings and reviews, and hire the best fit for your business.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  What kind of labourers can I find on LabourEase?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>You can find a variety of labourers on LabourEase, including but not limited to:</strong> packers, loaders, helpers, cleaners, and more. Our platform caters to various industries, including retail, logistics, and more.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <p>
            <a href="/faq">More FAQ</a>
          </p>
        </div>
        <div className="container">
          <p style={{color: 'black'}}>&copy; 2024 LabourEase</p>
        </div>
        
      </footer>
    </div>
  );
}