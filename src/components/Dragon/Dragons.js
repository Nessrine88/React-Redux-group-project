import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDragons,
  reserveDragon,
  cancelDragonReservation,
  selectDragons,
  selectReservedDragons, // Add this import
} from '../../redux/dragons/dragonsSlice';
import './Dragon.css';

function Dragons() {
  const dragons = useSelector(selectDragons);
  const reservedDragons = useSelector(selectReservedDragons); // Get reserved dragons from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragons());
  }, [dispatch]);

  useEffect(() => {
    // Load reserved dragon IDs from sessionStorage on component mount
    const reservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    reservedDragonIds.forEach((id) => dispatch(reserveDragon({ id })));
  }, [dispatch]);

  const handleReserveDragon = (id) => {
    dispatch(reserveDragon({ id }));

    // Update sessionStorage with the reserved dragon ID
    const reservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    if (!reservedDragonIds.includes(id)) {
      reservedDragonIds.push(id);
      sessionStorage.setItem('reservedDragons', JSON.stringify(reservedDragonIds));
    }
  };

  const handleCancelReservation = (id) => {
    dispatch(cancelDragonReservation({ id }));

    // Update sessionStorage to remove the canceled reservation
    const reservedDragonIds = JSON.parse(sessionStorage.getItem('reservedDragons') || '[]');
    const updatedReservedDragonIds = reservedDragonIds.filter((dragonId) => dragonId !== id);
    sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragonIds));
  };

  return (
    <div>
      <h1>Dragons</h1>
      <ul>
        {dragons.map((dragon) => (
          <li className="dragonLi" key={dragon.id}>
            <img className="dragon" src={dragon.flickr_images[0]} alt={dragon.name} />
            <div>
              <h2>{dragon.name}</h2>
              <p>
                Type:
                {dragon.type}
              </p>
              <p>
                Description:
                {dragon.description}
              </p>
              {reservedDragons[dragon.id] ? (
                <button type="button" onClick={() => handleCancelReservation(dragon.id)}>
                  Cancel Reservation
                </button>
              ) : (
                <button type="button" onClick={() => handleReserveDragon(dragon.id)}>
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
