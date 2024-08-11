import React from "react";
import Navbar from "./Navbar";
import JobSlider from "./JobSlider";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container text-center py-5">
        <div className="row py-4">
          <div className="col">
            <img
              src="/images/Header.png"
              className="img-fluid"
              alt="..."
              style={{ maxHeight: 500 }}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row py-4">
          <div className="col">
            <JobSlider />
          </div>
        </div>
        <div className="row py-4">
          <div className="row py-2">
            <h2
              className="text-center fw-bold text-uppercase"
              style={{
                color: "#333", // blue color
                fontSize: 24,
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // shadow effect
                borderRadius: 10, // rounded corners
                padding: 10, // add some padding
                backgroundColor: "rgba(255, 255, 255, 0.8)", // white background with opacity
                display: "inline-block", // make it an inline block element
              }}
            >
              Popular Job Categories
            </h2>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
          <div className="col">
            <a
              href="#"
              className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
              style={{
                "--bs-focus-ring-color": "rgba(var(--bs-success-rgb), .25)",
              }}
            >
              Software
            </a>
          </div>
        </div>
        <div className="row py-4">
        <div className="col">
  <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
    <a className="navbar-brand" href="#">Reviews</a>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className="nav-link" href="#page1">Page 1</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#page2">Page 2</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">More Pages</a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#page3">Page 3</a></li>
          <li><a className="dropdown-item" href="#page4">Page 4</a></li>
          <li><a className="dropdown-item" href="#page5">Page 5</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2 text-left" tabIndex="0" style={{
    height: 300, // fixed height
    overflowY: 'auto', // make it scrollable
  }}>
    <div id="page1" className="text-left">
      <h4>Reviews Page 1</h4>
      <h5>John Doe</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Jane Smith</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Bob Johnson</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Alice Brown</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Mike Davis</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
    </div>
    <div id="page2" className="text-left">
      <h4>Reviews Page 2</h4>
      <h5>Emily Chen</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>David Lee</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Sarah Taylor</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Kevin White</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      <h5>Lisa Nguyen</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
    </div>
    
  </div>
</div>
          </div>
        </div>
      
      
    </>
  );
}
