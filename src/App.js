import React, { useEffect } from 'react';
import {
  Routes, Route, BrowserRouter, Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import Myprofile from './components/MyProfile/Myprofile';
import Rockets from './components/Rockets/Rockets';
import Mission from './components/Mission/Mission';
import Dragons from './components/Dragon/Dragons';
import { fetchDragons } from './redux/dragons/dragonsSlice'; // Import your data fetching action

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch dragons data only when the app is mounted
    dispatch(fetchDragons());
  }, [dispatch]);

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
