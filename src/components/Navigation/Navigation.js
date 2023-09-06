import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/planet.png';
import './Navigation.css';

function Navigation() {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="" />
        <h2>Space Travelers&apos; Hub</h2>
      </div>
      <div className="list">
        <li>
          <NavLink to="/rockets">
            Rockets
          </NavLink>
        </li>
        <li>
          <NavLink to="/Mission">
            Mission
          </NavLink>
        </li>
        <li className="profile">
          <NavLink to="/myprofile">
            My Profile
          </NavLink>
        </li>
      </div>
    </div>
  );
}

export default Navigation;
