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
import { fetchDragons } from './redux/dragons/dragonsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragons());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/rockets" replace />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/dragons" element={<Dragons />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
