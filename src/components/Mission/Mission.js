import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../../redux/Mission/MissionSlice';

function Mission() {
  const missions = useSelector((state) => state.missions.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  return (
    <div>
      <h2>My mission page</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission.mission_id}>
            <h3>{mission.mission_name}</h3>
            <p>{mission.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mission;
