import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" />
        Rockets
      </li>
      <li>
        <Link to="/" />
        Mission
      </li>
      <li className="profile">
        <Link to="/" />
        My profile
      </li>

    </div>
  </div>
);

export default Navigation;
