import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleJoinLeaveMember } from '../../redux/Mission/MissionSlice';

function MyMissions() {
  const missions = useSelector((state) => state.missions.missions);
  const dispatch = useDispatch();
  const [reservedMissions, setReservedMissions] = React.useState([]);

  useEffect(() => {
    const sessionReservedMissions = sessionStorage.getItem('reservedMissions');
    if (sessionReservedMissions) {
      setReservedMissions(JSON.parse(sessionReservedMissions));
    }
  }, []);

  const handleToggleMembership = (missionId) => {
    const updatedReservedMissions = reservedMissions.includes(missionId)
      ? reservedMissions.filter((reservedId) => reservedId !== missionId)
      : [...reservedMissions, missionId];
    setReservedMissions(updatedReservedMissions);
    dispatch(toggleJoinLeaveMember(missionId));
    sessionStorage.setItem('reservedMissions', JSON.stringify(updatedReservedMissions));
  };

  const reservedMissionsData = missions.filter((mission) => reservedMissions.includes(mission.mission_id));

  return (
    <div>
      <h2>Reserved Missions</h2>
      {reservedMissionsData.length > 0 ? (
        <ul>
          {reservedMissionsData.map((mission) => (
            <li key={mission.mission_id}>
              <h3>{mission.mission_name}</h3>
              <p>{mission.description}</p>
              <button type="button" onClick={() => handleToggleMembership(mission.mission_id)}>
                {reservedMissions.includes(mission.mission_id) ? 'Leave Mission' : 'Join Mission'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't reserved any missions yet.</p>
      )}
    </div>
  );
}

export default MyMissions;
