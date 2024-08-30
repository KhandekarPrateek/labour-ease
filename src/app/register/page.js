"use client";
import { useState } from "react";
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
      <div className="register-form">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="register-label" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              placeholder="Username"
              onChange={changeHandler}
              name="username"
              id="username"
              value={formData.username}
              className="register-input"
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email here"
              onChange={changeHandler}
              name="email"
              id="email"
              value={formData.email}
              className="register-input"
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={changeHandler}
              name="password"
              id="password"
              value={formData.password}
              className="register-input"
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={changeHandler}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              className="register-input"
              required
            />
          </div>
          <div className="register-radio-group">
            <label>
              <input
                type="radio"
                onChange={changeHandler}
                name="role"
                value="shopkeeper"
                checked={formData.role === "shopkeeper"}
              />
              Shopkeeper
            </label>
            <label>
              <input
                type="radio"
                onChange={changeHandler}
                name="role"
                value="labour"
                checked={formData.role === "labour"}
              />
              Labour
            </label>
          </div>
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/" className="register-link">
            Go to Home
          </a>
          <br />
          <a href="/login" className="register-link">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}