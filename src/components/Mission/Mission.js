import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions, toggleJoinLeaveMember } from '../../redux/Mission/MissionSlice';
import './Mission.css';

function Mission() {
  const missions = useSelector((state) => state.missions.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const handleToggleMembership = (missionId) => {
    dispatch(toggleJoinLeaveMember(missionId));
  };

  return (
    <div>
      <table className="MissionTable">
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
                  ? 'member-active'
                  : 'member-not-active'
              }`}
            >
              <td className="MissionName">{mission.mission_name}</td>
              <td className="MissionDescription">{mission.description}</td>
              <td className="member">
                <button
                  type="button"
                  className={`${
                    mission.status === 'Active Member'
                      ? 'active-member-button'
                      : 'not-a-member-button'
                  }`}
                >
                  {mission.status === 'Active Member' ? 'Active Member' : 'Not A Member'}
                </button>
              </td>
              <td className="join">
                <button
                  type="button"
                  onClick={() => handleToggleMembership(mission.mission_id)}
                  className={`${
                    mission.status === 'Active Member'
                      ? 'leave-mission-button'
                      : 'join-mission-button'
                  }`}
                >
                  {mission.status === 'Active Member' ? 'Leave Mission' : 'Join Mission'}
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
