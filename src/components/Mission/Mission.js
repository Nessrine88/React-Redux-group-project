import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../../redux/Mission/MissionSlice';
import './Mission.css';

function Mission() {
  const missions = useSelector((state) => state.missions.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  return (
    <div>
      <table className="MissionTable">
        <tr>
          <th>Mission</th>
          <th>Description</th>
          <th>Status</th>
          <th>{' '}</th>

        </tr>
        {missions.map((mission, index) => (
          <tr key={mission.mission_id} className={index % 2 === 0 ? 'gray-background' : 'white-background'}>
            <td className="MissionName">{mission.mission_name}</td>
            <td className="MissionDescription">{mission.description}</td>
            <td className="member"><button type="button">Not A Member</button></td>
            <td className="join"><button type="button">Join Mission</button></td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Mission;
