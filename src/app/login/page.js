"use client";
import { useState } from "react";
import "./page.css";
import Image from 'next/image';

import toast from "react-hot-toast";

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
    <div className="logo">
  <Image
    src="/images/Header.png"  
    alt="Logo"
    width={80}          
    height={80}        

  />
</div>

      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="login-box">
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            className="login-input"
            placeholder="Enter your email"
          />
        </div>
        <div className="login-box">
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            className="login-input"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
      <div className="text-center">
        <a href="/" className="form-link">
          Go to Home
        </a>
        <br />
        <a href="/register" className="form-link">
          Register
        </a>
      </div>
    </div>
  );
}
