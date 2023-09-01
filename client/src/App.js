import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.js';
import './App.css';
import Collab from './components/realtime/collab';
import CollabEditor from './components/realtime/collabEditor.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/collab" element={<Collab />}></Route>
          <Route path="/collab/:id" element={<CollabEditor />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
