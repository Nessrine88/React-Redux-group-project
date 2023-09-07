import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDragons, cancelDragonReservation } from '../../redux/dragons/dragonsSlice';
import MyMissions from './MyMissions';
import './MyProfile.css';

function MyProfile() {
  const dragons = useSelector(selectDragons);
  const dispatch = useDispatch();
  const [reservedDragons, setReservedDragons] = React.useState(() => {
    const sessionReservedDragons = sessionStorage.getItem('reservedDragons');
    return sessionReservedDragons ? JSON.parse(sessionReservedDragons) : [];
  });

  useEffect(() => {
    const sessionReservedDragons = sessionStorage.getItem('reservedDragons');
    if (sessionReservedDragons) {
      setReservedDragons(JSON.parse(sessionReservedDragons));
    }
  }, []);

  const handleCancelReservation = (id) => {
    const updatedReservedDragons = reservedDragons.filter((dragonId) => dragonId !== id);
    setReservedDragons(updatedReservedDragons);
    dispatch(cancelDragonReservation({ id }));
    sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragons));
  };

  const reservedDragonsData = dragons.filter((dragon) => reservedDragons.includes(dragon.id));

  return (
    <div className="my-profile-container">
      <div className="column">
        <div className="my-missions">
          <MyMissions />
        </div>
      </div>
      <div className="column reserved-dragons">
        <h2>Reserved Dragons</h2>
        {reservedDragonsData.length > 0 ? (
          <ul>
            {reservedDragonsData.map((dragon) => (
              <li key={dragon.id}>
                <h3>{dragon.name}</h3>
                <p>{dragon.description}</p>
                <button type="button" onClick={() => handleCancelReservation(dragon.id)}>
                  Cancel Reservation
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven&apos;t reserved any dragons yet.</p>
        )}
      </div>
      <div className="column Dragon-column">
        <h2>Reserved Rockets</h2>
        <p>You haven&apos;t reserved any dragons yet.</p>
      </div>
    </div>
  );
}

export default MyProfile;
