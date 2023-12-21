import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../logo192.png';
import './styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar({ setIsLogin, isLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      setIsLogin(true);
      console.log(isLogin);
    }
  }, [isLogin]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLogin(false);
    toast.success(`Logged out`);
  };
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
              {!isLogin && (
                <button
                  className="login-btn"
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Log In
                </button>
              )}
              {isLogin && (
                <button className="login-btn" onClick={handleLogout}>
                  Log out
                </button>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
