import React from 'react';
import {
  Routes, Route, BrowserRouter, Navigate,
} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Myprofile from './components/MyProfile/Myprofile';
import Rockets from './components/Rockets/Rockets';
import Mission from './components/Mission/Mission';
import Dragons from './components/Dragon/Dragons';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/Rockets" replace />} />
          <Route path="/Myprofile" element={<Myprofile />} />
          <Route path="/Mission" element={<Mission />} />
          <Route path="/Rockets" element={<Rockets />} />
          <Route path="/Dragons" element={<Dragons />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
