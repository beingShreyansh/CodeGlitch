import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.js';
import './App.css';
import { Toaster } from 'react-hot-toast';
import FileList from './components/FileList.js';
import About from './components/about.js';
import Collab from './components/realtime/collab';
import CollabHome from './components/realtime/collabHome.js';
import Login from './components/login.js';
import Register from './components/register.js';

function App() {
  return (
    <div className="App">
      <div>
        <Toaster  
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              theme: {
                primary: 'red',
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/files" element={<FileList />}></Route>
          <Route path="/code/:fileName" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/collab" element={<Collab />}></Route>
          <Route path="/collab/:roomId" element={<CollabHome />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
