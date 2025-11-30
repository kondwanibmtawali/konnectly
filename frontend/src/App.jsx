import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Routes, Route } from "react-router-dom";
import AfricaMap from './pages/AfricanMap.jsx';

//import AfricaInteractive from './pages/AfricanMap'


function App() {
  return (
    <div className="App">
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/test">Africa Map</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Map App</h1>} />
        <Route path="/test" element={<AfricaMap />} />
      </Routes>
    </div>
  );
}

export default App;