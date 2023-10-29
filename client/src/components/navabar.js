import React from 'react';
import '../App.css';
import logo from '../logo192.png';
import './styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
function Navbar() {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      <header>
        <div className="logo">
          <a
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={logo} className="cgLogo" alt="logo" draggable="false" />
          </a>
        </div>
        {isAuthenticated && (
          <div>
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
            {console.log(user)}
          </div>
        )}
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
            {isAuthenticated ? (
              <li>
                <button
                  className="login-btn"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="login-btn"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
