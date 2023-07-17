import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';


function App() {
  return (
    <div className="App">
      <div className="contents">
        <h1 className="main-title">SnapCycle</h1>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>

      </div>
      

    </div>
  );
}

export default App;
