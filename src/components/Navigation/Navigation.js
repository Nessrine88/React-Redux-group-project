import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/planet.png';
import './Navigation.css';

const Navigation = () => (
  <div className="container">
    <div className="logo">
      <img src={logo} alt="" />
      <h2>Space Travelers&apos; Hub</h2>
    </div>
    <div className="list">
      <li>
        <NavLink to="/rockets" activeClassName="active">
          Rockets
        </NavLink>
      </li>
      <li>
        <NavLink to="/mission" activeClassName="active">
          Mission
        </NavLink>
      </li>
      <li className="profile">
        <NavLink to="/myprofile" activeClassName="active">
          My Profile
        </NavLink>
      </li>
    </div>
  </div>
);

export default Navigation;
