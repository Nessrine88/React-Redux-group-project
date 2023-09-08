
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRockets,
  selectRockets,
  bookRocket,
  cancelBooking,
} from '../../redux/rockets/rocketsSlice';
import './Rockets.css';

function Badge({ isBooked }) {
  if (isBooked) {
    return <span className="badge">Reserved</span>;
  }
  return null;
}

Badge.propTypes = {
  isBooked: PropTypes.bool.isRequired,
};

function Rockets() {
  const rockets = useSelector(selectRockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionReservedRockets = sessionStorage.getItem('reservedRockets');

    if (sessionReservedRockets) {
      const reservedRocketIds = JSON.parse(sessionReservedRockets);
      reservedRocketIds.forEach((rocketId) => dispatch(bookRocket(rocketId)));
    }

    dispatch(fetchRockets());
  }, [dispatch]);

  const handleBookingToggle = (rocketId) => {
    const rocket = rockets.find((r) => r.id === rocketId);
    if (rocket && rocket.booked) {
      dispatch(cancelBooking(rocketId));

      const reservedRockets = JSON.parse(sessionStorage.getItem('reservedRockets') || '[]');
      const updatedReservedRockets = reservedRockets.filter((id) => id !== rocketId);
      sessionStorage.setItem('reservedRockets', JSON.stringify(updatedReservedRockets));
    } else {
      dispatch(bookRocket(rocketId));

      const reservedRockets = JSON.parse(sessionStorage.getItem('reservedRockets') || '[]');
      sessionStorage.setItem('reservedRockets', JSON.stringify([...reservedRockets, rocketId]));
    }
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="rockets-container">
        {rockets.map((rocket) => (
          <div className="rocket-card" key={rocket.id}>
            <h2>{rocket.name}</h2>
            <Badge isBooked={rocket.booked} />
            <p>{rocket.description}</p>
            <img className="rocket-image" src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
            <button
              className={`rocket-button ${rocket.booked ? 'cancel-booking' : 'book-rocket'}`}
              type="button"
              onClick={() => handleBookingToggle(rocket.id)}
            >
              {rocket.booked ? 'Cancel Booking' : 'Book Rocket'}
            </button>
          </div>
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Rockets;
