import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDragons, reserveDragon, cancelDragonReservation, selectDragons,
} from '../../redux/dragons/dragonsSlice';
import './Dragon.css';

function Dragons() {
  const dragons = useSelector(selectDragons);
  const dispatch = useDispatch();

  const [reservedDragons, setReservedDragons] = React.useState(() => {
    const sessionReservedDragons = sessionStorage.getItem('reservedDragons');
    return sessionReservedDragons ? JSON.parse(sessionReservedDragons) : [];
  });

  useEffect(() => {
    dispatch(fetchDragons());
  }, [dispatch]);

  const handleReserveDragon = (id) => {
    setReservedDragons([...reservedDragons, id]);

    dispatch(reserveDragon({ id }));

    sessionStorage.setItem('reservedDragons', JSON.stringify([...reservedDragons, id]));
  };

  const handleCancelReservation = (id) => {
    const updatedReservedDragons = reservedDragons.filter((dragonId) => dragonId !== id);
    setReservedDragons(updatedReservedDragons);
    dispatch(cancelDragonReservation({ id }));
    sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragons));
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
              {(dragon.reserved || reservedDragons.includes(dragon.id)) ? (
                <button type="button" onClick={() => handleCancelReservation(dragon.id)}>Cancel Reservation</button>
              ) : (
                <button type="button" onClick={() => handleReserveDragon(dragon.id)}>Reserve</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dragons;
