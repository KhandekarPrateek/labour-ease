"use client"; // Add this at the top of your file

import React, { useState } from "react";
import Link from "next/link";
import { eventsData } from "../eventDatabase"; // Import the event data
import "./page.css";

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
