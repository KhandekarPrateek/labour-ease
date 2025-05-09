"use client";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import "./page.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "shopkeeper", // Default role
  });
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isModalOpen) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Set loading to true before fetching
    toast.loading("Loading...", { duration: 3000 }); // Show a toast message

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("You are registered successfully");
        // You might want to redirect the user or clear the form here
      } else if (response.status === 409) {
        toast.error("User already registered");
      } else {
        toast.error(data.error || "Failed to register");
      }
    } catch (error) {
      toast.error("Failed to register");
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  }

  return (
    <div className="register-container">
      <div className="scroll-down">
        SCROLL DOWN
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
        </svg>
      </div>
      <div className={`modal ${isModalOpen ? 'is-open' : ''}`}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Register</h1>
            <form onSubmit={submitHandler}>
              <div className="input-block">
                <label className="input-label" htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="input-block">
                <label className="input-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="input-block">
                <label className="input-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="input-block">
                <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="input-block">
                <label className="input-label">Role</label>
                <div className="register-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="shopkeeper"
                      checked={formData.role === "shopkeeper"}
                      onChange={changeHandler}
                    />
                    Shopkeeper
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="labour"
                      checked={formData.role === "labour"}
                      onChange={changeHandler}
                    />
                    Labour
                  </label>
                </div>
              </div>
              <div className="modal-buttons">
                <button className="input-button" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
            <p className="sign-up">Already have an account? <a href="/login">Login</a></p>
          </div>
          <div className="modal-right">
            <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="" />
          </div>
          <button className="icon-button close-button" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
            </svg>
          </button>
        </div>
        <button className="modal-button" onClick={() => setIsModalOpen(true)}>Click here to register</button>
      </div>
    </div>
  );
}