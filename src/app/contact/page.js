"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image"; // Assuming you'll add an image
import "./page.css"; // External CSS file

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ujhxo2s", "template_ssabsif", form.current, {
        publicKey: "p3vgRF-Nwfvf5bui5",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="container-fluid contact-container">
      <div className="row h-100 align-items-center">
        <div className="col-sm-8">
          <h1>Contact Us</h1>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                name="message"
                className="form-control"
                rows="4"
                required
              />
            </div>
            <input type="submit" value="Send" className="btn btn-primary" />
          </form>
        </div>
        <div className="col-sm-4 d-none d-sm-block">
          <Image
            src="/public/images/Header.png" // Replace with your image path
            alt="Contact Us Image"
            width={400}
            height={400}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
