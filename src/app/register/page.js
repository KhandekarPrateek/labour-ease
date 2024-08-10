"use client";
import { useState } from "react";
import { sql } from "@vercel/postgres";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
    typeOfUser: ""
  });

  function changeHandler(event) {
    setFormData((prevFormData) => {
      const { name, value, checked, type } = event.target;
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.createPassword === formData.confirmPassword) {
      const password = formData.createPassword;
      toast.success("You are registered successfully");
      // await sql
      // INSERT INTO users (firstName, lastName, email,password,typeOfUser)
      // VALUES (${formData.firstName}, ${formData.lastName}, ${email},${password},${formData.typeOfUser});
    } else {
      toast.error("createPassword and confirmPassword does not match");
      setFormData((prevFormData) => ({
        ...prevFormData,
        createPassword: "",
        confirmPassword: ""
      }));
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="firstName"
          onChange={changeHandler}
          name="firstName"
          value={formData.firstName}
        />
        <br />

        <input
          type="text"
          placeholder="lastName"
          onChange={changeHandler}
          name="lastName"
          value={formData.lastName}
        />
        <br />

        <input
          type="email"
          placeholder="Enter your email here"
          onChange={changeHandler}
          name="email"
          value={formData.email}
        />
        <br />

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
        <br />

        <input
          type="password" // Changed to password type for security
          placeholder="createPassword"
          onChange={changeHandler}
          name="createPassword"
          value={formData.createPassword}
        />
        <br />

        <input
          type="password" // Changed to password type for security
          placeholder="confirmPassword"
          onChange={changeHandler}
          name="confirmPassword"
          value={formData.confirmPassword}
        />
        <br />

        <br />

        <button>Submit</button>
      </form>
    </div>
  );
}