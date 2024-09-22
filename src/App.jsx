import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import Twoplayerinput from './Component/Exit-start/Exit';
import GamePlay from './Component/Game-play/Play';
import Winner from './Component/Wiiner/Winner';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Twoplayerinput />} />
        <Route path="/gameplay" element={<GamePlay />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </Router>
  );
}

export default App;
