"use client";

import React from "react";
import { useParams } from "next/navigation";
import { eventsData } from "../../eventDatabase";
import Link from "next/link";
import './page.css';

const EventDetails = () => {
  const { id } = useParams();
  const event = eventsData.find((event) => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-details-wrapper">
      <Link href="/events" className="back-link">Back to Events List</Link>
      <div className="event-details-container">
        <div className="event-image-wrapper">
          <img src={event.image} alt={event.name} className="event-image" />
        </div>
        <div className="event-content">
          <h1>{event.name}</h1>
          <p className="event-date">
            <strong>{event.year}</strong> - {event.month}
          </p>
          <p className="event-location">
            <strong>Location:</strong> {event.location}
          </p>
          <p>{event.description || "No additional details available for this event."}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
