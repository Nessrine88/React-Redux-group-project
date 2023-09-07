import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets, selectRockets, toggleBooking } from '../../redux/rockets/rocketsSlice';
import './Rockets.css';

function Badge({ isBooked }) {
  if (isBooked) {
    return <span className="badge">Reserved</span>;
  }
  return null;
}

Badge.propTypes = {
  isBooked: PropTypes.bool.isRequired, // PropTypes para isBooked
};

function Rockets() {
  const rockets = useSelector(selectRockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleBookingToggle = (rocketId) => {
    dispatch(toggleBooking(rocketId)); // Aquí cambiamos bookRocket por toggleBooking
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div>
        {rockets.map((rocket) => (
          <div key={rocket.id}>
            <h2>{rocket.name}</h2>
            <Badge isBooked={rocket.booked} />
            <p>{rocket.description}</p>
            <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
            <button
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
