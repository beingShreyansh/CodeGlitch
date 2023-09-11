import React, { useState } from 'react';
import '../App.css';
import logo from '../logo192.png';
import './styles/navbar.css';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="logo">
          <a
            href=" "
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={logo} className="cgLogo" alt="logo" draggable="false" />
          </a>
        </div>
        <div className="navBar">
          <ul>
            <li>
              <a
                href=""
                color=""
                onClick={() => {
                  navigate('/collab');
                }}
              >
                Collab
              </a>
            </li>

            <li>
              <a
                href=" "
                color=""
                onClick={() => {
                  navigate('/About');
                }}
              >
                About
              </a>
            </li>
            <li>
              <button className="login-btn">Login</button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
