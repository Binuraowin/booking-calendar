import React from 'react';
import { BookingsProps, Booking } from '../types';

const Bookings: React.FC<BookingsProps> = ({ bookings = [], availableSlots = 0 }) => {
  return (
    <div className="bookings-container">
      <h4>Bookings ({bookings.length})</h4>
      <p>{availableSlots} slots available</p>
      
      {bookings.length === 0 ? (
        <p>No bookings for this day</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking: Booking, index: number) => (
            <li key={`booking-${index}`} className="booking-item">
              <div className="booking-time">
                {new Date(booking.date).toLocaleTimeString()}
              </div>
              <div className="booking-details">
                <div className="booking-title">{booking.title}</div>
                {booking.description && (
                  <div className="booking-description">{booking.description}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;