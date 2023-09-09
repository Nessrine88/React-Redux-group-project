import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDragons, cancelDragonReservation,
} from '../../redux/dragons/dragonsSlice';
import {
  selectRockets, cancelBooking as cancelRocketBooking,
} from '../../redux/rockets/rocketsSlice';
import MyMissions from './MyMissions';
import './MyProfile.css';

function MyProfile() {
  const dragons = useSelector(selectDragons);
  const rockets = useSelector(selectRockets);
  const [reservedDragonIds, setReservedDragonIds] = useState([]);
  const [reservedRocketIds, setReservedRocketIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionReservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    setReservedDragonIds(sessionReservedDragonIds);
  }, []);

  useEffect(() => {
    const sessionReservedRocketIds = JSON.parse(sessionStorage.getItem('reservedRockets') || '[]');
    setReservedRocketIds(sessionReservedRocketIds);
  }, []);

  const handleCancelDragonReservation = (id) => {
    dispatch(cancelDragonReservation({ id }));
    const updatedReservedDragonIds = reservedDragonIds.filter((dragonId) => dragonId !== id);
    setReservedDragonIds(updatedReservedDragonIds);
    sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragonIds));
  };

  const handleCancelRocketBooking = (rocketId) => {
    dispatch(cancelRocketBooking(rocketId));
    const updatedReservedRocketIds = reservedRocketIds.filter((id) => id !== rocketId);
    setReservedRocketIds(updatedReservedRocketIds);
    sessionStorage.setItem('reservedRockets', JSON.stringify(updatedReservedRocketIds));
  };

  const reservedDragonsData = dragons.filter((dragon) => reservedDragonIds.includes(dragon.id));
  const reservedRocketsData = rockets.filter((rocket) => reservedRocketIds.includes(rocket.id));

  return (
    <div className="container">
      <div className="MyRockets flex">
        <h2>Reserved Rockets</h2>
        {reservedRocketsData.length > 0 ? (
          <ul>
            {reservedRocketsData.map((rocket) => (
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
      <div className="MyMissions flex">
        <MyMissions />
      </div>
      <div className="MyDragons flex">
        <h2>Reserved Dragons</h2>
        {reservedDragonsData.length > 0 ? (
          <ul>
            {reservedDragonsData.map((dragon) => (
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
