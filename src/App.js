import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Myprofile from './components/MyProfile/Myprofile';
import Rockets from './components/Rockets/Rockets';
import Mission from './components/Mission/Mission';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Navigation />
        <Routes>
          <Route path="/Myprofile" element={<Myprofile />} />
        </Routes>
        <Routes>
          <Route path="/Mission" element={<Mission />} />
        </Routes>
        <Routes>
          <Route path="/Rockets" element={<Rockets />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
