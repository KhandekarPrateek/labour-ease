'use client'
import React from "react";
import Navbar from "./Navbar";
import JobSlider from "./JobSlider";
import Footer from "./Footer";
import { TypeAnimation } from "react-type-animation";
import "./Home.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container text-center py-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-container">
            <h1>Find a job that suits</h1>
            <h1>your interests and skills</h1>
            <TypeAnimation
                sequence={[
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.\n", // First line with newline
                  1000, // Pause after first line
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nDolorem voluptate repellat modi quidem aliquid eaque ducimus ipsa et,\n", // First and second line with newlines
                  1000, // Pause after second line
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nDolorem voluptate repellat modi quidem aliquid eaque ducimus ipsa et,\nFacere mollitia!", // All three lines
                  2000, // Pause with all lines visible
                  "", // Clear all lines
                  1000, // Pause when empty
                ]}
                speed={50}
                cursor={true}
                repeat={Infinity}
                style={{
                  fontSize: "1rem",
                  color: "#555",
                  display: "block",
                  marginTop: "10px",
                  minHeight: "4.5em", // Reserve space for 3 lines plus some padding
                  whiteSpace: "pre-line", // Preserve newlines while wrapping text
                  textAlign: "left", // Align text to the left for better readability
                  lineHeight: "1.5", // Add some spacing between lines
                }}
              />
          </div>
          <div className="image-container">
            <div
              className="image-wrapper"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on mouse position
                const xRotation = (y - rect.height / 2) / 15;
                const yRotation = (x - rect.width / 2) / -15;
                
                e.currentTarget.style.transform = `
                  rotateX(${xRotation}deg)
                  rotateY(${yRotation}deg)
                  scale3d(1.02, 1.02, 1.02)
                `;

                // Update spotlight position
                const spotlightX = (x / rect.width) * 100;
                const spotlightY = (y / rect.height) * 100;
                
                const gradientIntensity = Math.max(0, 1 - (x / rect.width)); // Stronger on left side
                e.currentTarget.style.background = `
                  radial-gradient(
                    circle at ${spotlightX}% ${spotlightY}%, 
                    rgba(37,89,222,${0.2 * gradientIntensity}) 0%,
                    transparent 60%
                  ),
                  radial-gradient(
                    circle 710px at 5.2% 7.2%,
                    rgba(37,89,222,${0.3 * gradientIntensity}) 0%,
                    rgba(37,89,222,${0.2 * gradientIntensity}) 7.5%,
                    rgba(4,4,29,${0.1 * gradientIntensity}) 44.7%,
                    transparent 80%
                  )
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale3d(1, 1, 1)";
                e.currentTarget.style.background = `
                  radial-gradient(
                    circle 710px at 5.2% 7.2%,
                    rgba(37,89,222,0.3) 0%,
                    rgba(37,89,222,0.2) 7.5%,
                    rgba(4,4,29,0.1) 44.7%,
                    transparent 80%
                  )
                `;
              }}
            >
              <Image
                width={400}
                height={400}
                src="/images/heroS.jpg"
                alt="hero"
                className="img-fluid"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
              />
            </div>
</div>
        </div>


        {/* Job Slider Section */}
        <div className="row job-slider-section">
            <div className="col">
              <JobSlider />
            </div>
          </div>


        {/* Popular Job Categories Section */}
        <div className="row mb-4 popular">
          <h2 className="text-center fw-bold text-uppercase mb-3">
            Popular Job Categories
          </h2>
          <div className="col-12 d-flex flex-wrap justify-content-center gap-3">
            {[
              "Cashier",
              "Cleaning Staff",
              "Delivery Personnel",
              "Manager",
              "Floor Supervisor",
              "Customer Service",
              "Caretaker",
              "Housekeeper",
            ].map((category, index) => (
              <a
                key={index}
                href="#"
                className="btn btn-outline-primary shadow-sm"
                style={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="row">
          <div className="col">
            <nav
              id="navbar-example2"
              className="navbar px-3 mb-3 shadow-sm rounded"
            >
              <a className="navbar-brand" href="#">
                Reviews
              </a>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a className="nav-link active" href="#page1">
                    Page 1
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#page2">
                    Page 2
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    More Pages
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#page3">
                            Page 3
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#page4">
                            Page 4
                        </a>
                    </li>
                </ul>
                </li>
              </ul>
            </nav>

            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-smooth-scroll="true"
              className="scrollspy-example p-3 rounded shadow-sm"
              tabIndex="0"
              style={{
                height: 300,
                overflowY: "auto",
              }}
            >
              <div id="page1">
                <h4>Reviews Page 1</h4>
                <h5>John Doe</h5>
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
