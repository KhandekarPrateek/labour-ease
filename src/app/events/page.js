"use client"; // Add this at the top of your file

import React, { useState } from 'react';
import Link from 'next/link';
import './page.css';

const eventsData = [
  { id: 1, name: 'Event 1', year: 2024, month: 'August', location: 'VijayNagar,Indore', image: '/images/event1.jpg' },
  { id: 2, name: 'Event 2', year: 2024, month: 'September', location: 'Saket,Indore', image: '/images/event2.jpg' },
  // Add more events here
];

const EventsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = eventsData.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-wrapper">
      <h2>Events</h2>
      <input
        type="text"
        placeholder="Search events"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="events-container">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-box">
            <img src={event.image} alt={event.name} className="event-image" />
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{event.year} - {event.month}</p>
              <p>{event.location}</p>
              <Link href={`/events/${event.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
