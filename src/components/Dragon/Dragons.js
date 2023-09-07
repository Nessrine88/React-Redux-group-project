import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDragons, reserveDragon, cancelDragonReservation, selectDragons,
} from '../../redux/dragons/dragonsSlice';
import './Dragon.css';

function Dragons() {
  const dragons = useSelector(selectDragons);
  const dispatch = useDispatch();

  React.useEffect(() => {
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
              {dragon.reserved ? (
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
