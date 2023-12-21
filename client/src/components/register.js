import React, { useState } from 'react';
import './styles/login.css';
import logo from '.././logo192.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        console.log('Done');
        navigate('/login');
      }
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error Registerung', error);
    }
  };

  return (
    <form className="login" method="post">
      <div className="imgcontainer">
        <img src={logo} alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <label htmlFor="email">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="John@example.com"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="*********"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={(e) => handleRegister(e)}>
          Register
        </button>
      </div>

      <div className="container">
        <button
          type="button"
          className="cancelbtn"
          onClick={() => {
            navigate('/');
          }}
        >
          Cancel
        </button>
        <button type="button" className="cancelbtn" onClick={handleRegister}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
