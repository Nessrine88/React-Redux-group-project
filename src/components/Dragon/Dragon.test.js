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

function Dragons() { // Changed component name to "Dragons"
  const dragons = useSelector(selectRockets); // Updated the selector name
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionReservedDragons = sessionStorage.getItem('reservedDragons'); // Updated storage key

    if (sessionReservedDragons) {
      const reservedDragonIds = JSON.parse(sessionReservedDragons);
      reservedDragonIds.forEach((dragonId) => dispatch(bookRocket(dragonId))); // Updated action name
    }

    dispatch(fetchRockets());
  }, [dispatch]);

  const handleBookingToggle = (dragonId) => { // Updated parameter name
    const dragon = dragons.find((d) => d.id === dragonId); // Updated variable name
    if (dragon && dragon.booked) {
      dispatch(cancelBooking(dragonId)); // Updated action name

      const reservedDragons = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]'); // Updated storage key
      const updatedReservedDragons = reservedDragons.filter((id) => id !== dragonId);
      sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragons)); // Updated storage key
    } else {
      dispatch(bookRocket(dragonId)); // Updated action name

      const reservedDragons = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]'); // Updated storage key
      sessionStorage.setItem('reservedDragons', JSON.stringify([...reservedDragons, dragonId])); // Updated storage key
    }
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="rockets-container">
        {dragons.map((dragon) => ( // Updated variable name
          <div className="rocket-card" key={dragon.id}> {/* Updated class names and key */}
            <h2>{dragon.name}</h2>
            <Badge isBooked={dragon.booked} />
            <p>{dragon.description}</p>
            <img className="rocket-image" src={dragon.flickr_images[0]} alt={dragon.name} /> {/* Updated variable name */}
            <button
              className={`rocket-button ${dragon.booked ? 'cancel-booking' : 'book-rocket'}`}
              type="button"
              onClick={() => handleBookingToggle(dragon.id)} {/* Updated variable name */}
            >
              {dragon.booked ? 'Cancel Booking' : 'Book Dragon'} {/* Updated text */}
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

export default Dragons; // Updated component export name
