// Dragons.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDragons, reserveDragon, cancelDragonReservation, selectDragons,
} from '../redux/dragons/dragonsSlice';

function Dragons() {
  const dragons = useSelector(selectDragons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragons());
  }, [dispatch]);

  const handleReserveDragon = (id) => {
    dispatch(reserveDragon({ id }));
  };

  const handleCancelReservation = (id) => {
    dispatch(cancelDragonReservation({ id }));
  };

  return (
    <div>
      <h2>Dragons</h2>
      <ul>
        {dragons.map((dragon) => (
          <li key={dragon.id}>
            <h3>{dragon.name}</h3>
            <p>{dragon.description}</p>
            {dragon.reserved ? (
              <div>
                <p>Status: Reserved</p>
                <button type="button" onClick={() => handleCancelReservation(dragon.id)}>
                  Cancel Reservation
                </button>
              </div>
            ) : (
              <div>
                <p>Status: Not Reserved</p>
                <button type="button" onClick={() => handleReserveDragon(dragon.id)}>
                  Reserve Dragon
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dragons;
