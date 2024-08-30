'use client'
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Image from 'next/image';
import "./page.css"

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
    <div className="container contact-container">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-md-12 col-lg-6">
          <h1 className="display-4">Contact Us</h1>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className="form-control"
                placeholder="Enter your name"
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
                id="user_email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="form-control"
                rows="6"
                placeholder="Enter your message"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
        <div className="col-md-12 col-lg-6 d-none d-md-block">
          <Image
        src="/images/contact.avif" 
        alt="Contact Us"
        layout="responsive" 
        width={700} 
        height={475} 
        className="img-fluid" 
      />
        </div>
      </div>
    </div>
  );
}