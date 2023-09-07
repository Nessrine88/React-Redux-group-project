import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDragons, cancelDragonReservation } from '../../redux/dragons/dragonsSlice';

function MyProfile() {
  const dragons = useSelector(selectDragons);
  const dispatch = useDispatch();

  // Local component state to track reserved dragons for the current session
  const [reservedDragons, setReservedDragons] = React.useState(() => {
    // Initialize from session storage or an empty array
    const sessionReservedDragons = sessionStorage.getItem('reservedDragons');
    return sessionReservedDragons ? JSON.parse(sessionReservedDragons) : [];
  });

  useEffect(() => {
    // Ensure reserved dragons are in sync with session storage
    const sessionReservedDragons = sessionStorage.getItem('reservedDragons');
    if (sessionReservedDragons) {
      setReservedDragons(JSON.parse(sessionReservedDragons));
    }
  }, []);

  const handleCancelReservation = (id) => {
    // Update local state
    const updatedReservedDragons = reservedDragons.filter((dragonId) => dragonId !== id);
    setReservedDragons(updatedReservedDragons);
    // Dispatch the cancel reservation action
    dispatch(cancelDragonReservation({ id }));
    // Update session storage
    sessionStorage.setItem('reservedDragons', JSON.stringify(updatedReservedDragons));
  };

  const reservedDragonsData = dragons.filter((dragon) => reservedDragons.includes(dragon.id));

  return (
    <div>
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
  );
}

export default MyProfile;
