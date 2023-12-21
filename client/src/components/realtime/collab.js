import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './styles/collab.css';
import HeadInfo from './headInfo';
import Navbar from '../navabar';

import logo from './images/logo192.png';

const Collab = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [creditCard, setCreditCard] = useState('');

  const generateRandomNumber = () => {
    let randomNumber = '';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        randomNumber += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
      }
      if (i < 3) {
        randomNumber += '-'; // Adds hyphens between groups of digits
      }
    }
    return randomNumber;
  };

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = generateRandomNumber();
    setRoomId(id);
    toast.success('Created a new room');
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('ROOM ID & username is required');
      return;
    }

    // Redirect
    navigate(`/collab/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = formatText(inputValue);
    setCreditCard(formattedValue);
  };

  const formatText = (value) => {
    const regex = /(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/;
    const parts = value.match(regex);
    if (!parts) return value;
    const formattedValue = [parts[1], parts[2], parts[3], parts[4]]
      .filter(Boolean)
      .join('-');
    setRoomId(formattedValue);
    return formattedValue;
  };

  return (
    <div className="homePageWrapper">
      <HeadInfo title="Code Glitch - Collab" />
      <Navbar />
      <div className="center">
        <div className="formWrapper">
          <img className="homePageLogo" src={logo} alt="code-glith" />
          <h4 className="mainLabel">Paste invitation ROOM ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="ROOM ID"
              value={creditCard || roomId}
              maxLength="19"
              onChange={handleInputChange}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="USERNAME"
              minLength={3}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />
            <button className="joinBtn1 joinBtn" onClick={joinRoom}>
              Join
            </button>
            <span className="createInfo">
              If you don't have an invite then create &nbsp;
              <a onClick={createNewRoom} href=" " className="createNewBtn">
                new room
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collab;
