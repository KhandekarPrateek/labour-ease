"use client";
import { useState } from "react";
import { sql } from "@vercel/postgres";
import toast from "react-hot-toast";
import "./page.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
    typeOfUser: "",
  });

  function changeHandler(event) {
    setFormData((prevFormData) => {
      const { name, value, checked, type } = event.target;
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    // if (formData.createPassword === formData.confirmPassword) {
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   if (response.ok) {
    //     toast.success("You are registered successfully");
    //   } else {
    //     toast.error("Failed to register");
    //   }
    // } else {
    //   toast.error("createPassword and confirmPassword does not match");
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     createPassword: "",
    //     confirmPassword: ""
    //   }));
    // }
  }
  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="register-label" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              placeholder="First Name"
              onChange={changeHandler}
              name="firstName"
              id="firstName"
              value={formData.firstName}
              className="register-input"
            />
          </div>
          <div>
            <label className="register-label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={changeHandler}
              name="lastName"
              id="lastName"
              value={formData.lastName}
              className="register-input"
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
            />
          </div>
          <div className="register-radio-group">
            <input
              type="radio"
              onChange={changeHandler}
              name="typeOfUser"
              id="isShopkeeper"
              value="Shopkeeper"
              checked={formData.typeOfUser === "Shopkeeper"}
            />
            <label htmlFor="isShopkeeper">Shopkeeper</label>

            <input
              type="radio"
              onChange={changeHandler}
              name="typeOfUser"
              id="isWorker"
              value="Worker"
              checked={formData.typeOfUser === "Worker"}
            />
            <label htmlFor="isWorker">Worker</label>
          </div>
          <div>
            <label className="register-label" htmlFor="createPassword">
              Create Password:
            </label>
            <input
              type="password"
              placeholder="Create Password"
              onChange={changeHandler}
              name="createPassword"
              id="createPassword"
              value={formData.createPassword}
              className="register-input"
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
            />
          </div>
          <button type="submit" className="register-button">
            Submit
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
