import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets, selectRockets } from '../../redux/rockets/rocketsSlice';

function Rockets() {
  const rockets = useSelector(selectRockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  let content;

  if (rockets.status === 'loading') {
    content = <div>Loading...</div>;
  } else if (rockets.status === 'succeeded') {
    content = (
      <div>
        {rockets.rockets.map((rocket) => (
          <div key={rocket.id}>
            <h2>{rocket.rocket_name}</h2>
            <p>{rocket.description}</p>
            <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
          </div>
        ))}
      </div>
    );
  } else if (rockets.status === 'failed') {
    content = (
      <div>
        Error:
        {rockets.error}
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Rockets;
