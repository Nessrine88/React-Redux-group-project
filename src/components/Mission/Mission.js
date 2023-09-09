import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMissions,
  toggleJoinLeaveMember,
} from '../../redux/Mission/MissionSlice';
import './Mission.css';

function Mission() {
  const missions = useSelector((state) => state.missions.missions);
  const dispatch = useDispatch();

  const [reservedMissions, setReservedMissions] = React.useState(() => {
    const sessionReservedMissions = sessionStorage.getItem('reservedMissions');
    return sessionReservedMissions ? JSON.parse(sessionReservedMissions) : [];
  });

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const handleToggleMembership = (missionId) => {
    const updatedReservedMissions = reservedMissions.includes(missionId)
      ? reservedMissions.filter((reservedId) => reservedId !== missionId)
      : [...reservedMissions, missionId];

    setReservedMissions(updatedReservedMissions);

    dispatch(toggleJoinLeaveMember(missionId));

    sessionStorage.setItem('reservedMissions', JSON.stringify(updatedReservedMissions));
  };

  return (
    <div>
      <table className="missiontable">
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th>{' '}</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, index) => (
            <tr
              key={mission.mission_id}
              className={`${
                index % 2 === 0 ? 'gray-background' : 'white-background'
              } ${
                mission.status === 'Active Member'
                  ? 'member-not-active'
                  : 'member-active'
              }`}
            >
              <td className="missionname">{mission.mission_name}</td>
              <td className="missiondescription">{mission.description}</td>
              <td className="member">
                <button
                  type="button"
                  className={`${
                    reservedMissions.includes(mission.mission_id)
                      ? 'active-member-button'
                      : 'not-a-member-button'
                  }`}
                >
                  {reservedMissions.includes(mission.mission_id) ? 'Active Member' : 'Not A Member' }
                </button>
              </td>
              <td className="join">
                <button
                  type="button"
                  onClick={() => handleToggleMembership(mission.mission_id)}
                  className={`${
                    reservedMissions.includes(mission.mission_id)
                      ? 'leave-mission-button'
                      : 'join-mission-button'
                  }`}
                >
                  {reservedMissions.includes(mission.mission_id) ? 'Leave Mission' : 'Join Mission' }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mission;
