"use client"; // Add this at the top of your file

import React, { useState } from "react";
import Link from "next/link";
import "./page.css";

const eventsData = [
  {
    id: 1,
    name: "Skill Enhancement Workshop",
    year: 2024,
    month: "August",
    location: "Mumbai, India",
    image: "/images/sdw.jpg",
  },
  {
    id: 2,
    name: "Shopkeeper Support Group",
    year: 2024,
    month: "September",
    location: "Delhi, India",
    image: "/images/ssg.jpg",
  },
  {
    id: 3,
    name: "Local Vendor Market Day",
    year: 2023,
    month: "July",
    location: "Bangalore, India",
    image: "/images/lvmd.jpg",
  },
  {
    id: 4,
    name: "Street Vendor Meet-Up",
    year: 2024,
    month: "March",
    location: "Hyderabad, India",
    image: "/images/swm.webp",
  },
  {
    id: 5,
    name: "Business Growth Seminar",
    year: 2023,
    month: "December",
    location: "Pune, India",
    image: "/images/bgs.jpg",
  },
  {
    id: 6,
    name: "Community Networking Meet",
    year: 2024,
    month: "January",
    location: "Gurgaon, India",
    image: "/images/CommunityMeet.jpg",
  },
  {
    id: 7,
    name: "Music Festival",
    year: 2023,
    month: "October",
    location: "Goa, India",
    image: "/images/MusicFestive.avif",
  },
  {
    id: 8,
    name: "Trade Skill Training Program",
    year: 2024,
    month: "June",
    location: "Kolkata, India",
    image: "/images/trade-skill.jpg",
  },
  {
    id: 9,
    name: "Food Carnival",
    year: 2023,
    month: "May",
    location: "Chennai, India",
    image: "/images/foodCarnival.webp",
  },
  {
    id: 10,
    name: "Neighborhood Bazaar",
    year: 2024,
    month: "February",
    location: "Jaipur, India",
    image: "/images/bazar.jpeg",
  },
];

const EventsList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = eventsData.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-wrapper">
      <h2>Ongoing Events</h2>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="events-container">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-details">
              <h3>{event.name}</h3>
              <p className="event-date">
                {event.year} - {event.month}
              </p>
              <p className="event-location">{event.location}</p>
              <Link href={`/events/${event.id}`}>View Details</Link>
            </div>
            <div className="event-image-wrapper">
              <img
                src={event.image}
                alt={event.name}
                className="event-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
