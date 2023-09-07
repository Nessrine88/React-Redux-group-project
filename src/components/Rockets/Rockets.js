import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRockets, selectRockets, bookRocket, cancelBooking,
} from '../../redux/rockets/rocketsSlice';

function Rockets() {
  const rockets = useSelector(selectRockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleBookingToggle = (rocketId, isBooked) => {
    if (isBooked) {
      dispatch(cancelBooking(rocketId));
    } else {
      dispatch(bookRocket(rocketId));
    }
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
            {rocket.booked && <span>Reserved</span>}
            <p>{rocket.description}</p>
            <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
            <button
              type="button"
              onClick={() => handleBookingToggle(rocket.id, rocket.booked)}
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
