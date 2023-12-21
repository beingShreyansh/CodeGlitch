import React, { useState } from 'react';
import './styles/login.css';
import logo from '.././logo192.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', response.data.email);
      console.log(response.status);
      if (response.status === 401) {
        toast.success(`User not found`);
      }
      if (response.status === 201) {
        console.log('Done');
        navigate('/');
        toast.success(`Logged in`);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error Logging in:', error);
    }
  };

  return (
    <form className="login">
      <div className="imgcontainer">
        <img src={logo} alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="john@test.com"
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

        <button type="submit" onClick={(e) => handleLogin(e)}>
          Login
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
        <button
          type="button"
          className="cancelbtn"
          onClick={() => {
            navigate('/register');
          }}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;
