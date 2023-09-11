import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.js';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Collab from './components/realtime/collab';
import CollabHome from './components/realtime/collabHome.js';

function App() {
  return (
    <div className='App'>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/collab" element={<Collab />}></Route>
          <Route path="/collab/:roomId" element={<CollabHome />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
