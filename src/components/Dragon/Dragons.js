// Dragons.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDragons,
  reserveDragon,
  cancelDragonReservation,
  selectDragons,
  selectReservedDragons,
} from '../../redux/dragons/dragonsSlice';
import './Dragon.css';

function Dragons() {
  const dragons = useSelector(selectDragons);
  const reservedDragons = useSelector(selectReservedDragons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragons());
  }, [dispatch]);

  useEffect(() => {
    const reservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    reservedDragonIds.forEach((id) => dispatch(reserveDragon({ id })));
  }, [dispatch]);

  const handleReserveDragon = (id) => {
    dispatch(reserveDragon({ id }));

    const reservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    if (!reservedDragonIds.includes(id)) {
      reservedDragonIds.push(id);
      sessionStorage.setItem('reservedDragons', JSON.stringify(reservedDragonIds));
    }
  };

  const handleCancelReservation = (id) => {
    dispatch(cancelDragonReservation({ id }));

    const reservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    const updatedReservedDragonIds = reservedDragonIds.filter((dragonId) => dragonId !== id);
    sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragonIds));
  };

  return (
    <div className="dragons-container">
      <h1 className="dragons-header">Dragons</h1>
      <ul className="dragons-list">
        {dragons.map((dragon) => (
          <li className="dragon-item" key={dragon.id}>
            <img className="dragon-image" src={dragon.flickr_images[0]} alt={dragon.name} />
            <div className="dragon-details">
              <h2 className="dragon-name">{dragon.name}</h2>
              <p className="dragon-type">
                Type:
                {' '}
                {dragon.type}
              </p>
              <p className="dragon-description">
                Description:
                {' '}
                {dragon.description}
              </p>
              {reservedDragons[dragon.id] ? (
                <button className="cancel-button" type="button" onClick={() => handleCancelReservation(dragon.id)}>
                  Cancel Reservation
                </button>
              ) : (
                <button className="reserve-button" type="button" onClick={() => handleReserveDragon(dragon.id)}>
                  Reserve
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dragons;
