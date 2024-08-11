"use client";
import { useState } from "react";
import "./page.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // Handle successful login (e.g., redirect to dashboard)
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Failed to login");
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleOnSubmit}>
          <label className="login-label">
            Email Address
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="login-input"
              placeholder="Enter your email"
            />
          </label>
          <label className="login-label">
            Password
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="login-input"
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
