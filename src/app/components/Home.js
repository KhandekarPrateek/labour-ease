import React from "react";
import Navbar from "./Navbar";
import JobSlider from "./JobSlider";
import Footer from "./Footer";
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!
            </p>
          </div>
          <div className="image-container">
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

        {/* Search Bar Section */}
        <div className="row mb-4">
          <div className="col">
            <form className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2 shadow-sm"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ maxWidth: 400 }}
              />
              <button className="btn btn-success shadow-sm" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Job Slider Section */}
        <div className="row mb-4">
          <div className="col">
            <JobSlider />
          </div>
        </div>

        {/* Popular Job Categories Section */}
        <div className="row mb-4">
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
              className="navbar bg-light px-3 mb-3 shadow-sm rounded"
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
                    <li>
                      <a className="dropdown-item" href="#page5">
                        Page 5
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
              className="scrollspy-example bg-light p-3 rounded shadow-sm"
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
                <h5>Jane Smith</h5>
                <p>Lorem ipsum dolor sit amet...</p>
                {/* Add more reviews */}
              </div>
              <div id="page2">
                <h4>Reviews Page 2</h4>
                <h5>Emily Chen</h5>
                <p>Lorem ipsum dolor sit amet...</p>
                <h5>David Lee</h5>
                <p>Lorem ipsum dolor sit amet...</p>
                {/* Add more reviews */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
