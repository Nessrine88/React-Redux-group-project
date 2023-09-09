import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/planet.png';
import './Navigation.css';

function Navigation() {
  return (
    <div className="nav-container">
      <div className="logo">
        <img src={logo} alt="Space Travelers Hub" className="logo-img" />
        <h2 className="logo-text">Space Travelers Hub</h2>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/rockets" className="nav-link">
            Rockets
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Mission" className="nav-link">
            Mission
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Dragons" className="nav-link">
            Dragons
          </NavLink>
        </li>
        <li className="nav-item profile">
          <NavLink to="/myprofile" className="nav-link">
            My Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
