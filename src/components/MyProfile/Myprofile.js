import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDragons, cancelDragonReservation } from '../../redux/dragons/dragonsSlice';
import { selectRockets, cancelBooking as cancelRocketBooking } from '../../redux/rockets/rocketsSlice';
import MyMissions from './MyMissions';
import './MyProfile.css';

function MyProfile() {
  const dragons = useSelector(selectDragons);
  const rockets = useSelector(selectRockets);

  const dispatch = useDispatch();

  const reservedDragons = dragons.filter((dragon) => dragon.reserved);
  const reservedRockets = rockets.filter((rocket) => rocket.booked);

  const handleCancelDragonReservation = (id) => {
    dispatch(cancelDragonReservation({ id }));
  };

  const handleCancelRocketBooking = (rocketId) => {
    dispatch(cancelRocketBooking(rocketId));
    const reservedRockets = JSON.parse(sessionStorage.getItem('reservedRockets') || '[]');
    const updatedReservedRockets = reservedRockets.filter((id) => id !== rocketId);
    sessionStorage.setItem('reservedRockets', JSON.stringify(updatedReservedRockets));
  };

  return (
    <div className="container">
      <div className="MyRockets">
        <h2>Reserved Rockets</h2>
        {reservedRockets.length > 0 ? (
          <ul>
            {reservedRockets.map((rocket) => (
              <li key={rocket.id}>
                <h3>{rocket.name}</h3>
                <p>{rocket.description}</p>
                <button type="button" onClick={() => handleCancelRocketBooking(rocket.id)}>
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven&apos;t reserved any rockets yet.</p>
        )}
      </div>
      <div className="MyMissions">
        <MyMissions />
      </div>
      <div className="MyDragons">
        <h2>Reserved Dragons</h2>
        {reservedDragons.length > 0 ? (
          <ul>
            {reservedDragons.map((dragon) => (
              <li key={dragon.id}>
                <h3>{dragon.name}</h3>
                <p>{dragon.description}</p>
                <button type="button" onClick={() => handleCancelDragonReservation(dragon.id)}>
                  Cancel Reservation
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven&apos;t reserved any dragons yet.</p>
        )}
      </div>

    </div>
  );
}

export default MyProfile;
