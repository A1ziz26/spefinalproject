import React, { useState } from 'react';
import LoginPage from './Components/LoginPage/LoginPage';
import HomePage from './Components/HomePage/HomePage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import PBookNow from './Components/Bookingpage/Bookingpage';
import Patientscreen from './Components/MyBookings/MyBookings';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Add authentication logic here
    // For demo purposes, always set loggedIn to true
    setLoggedIn(true);
  };

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/booking" element={<PBookNow/>}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/mybookings" element={<Patientscreen/>}></Route>
        <Route path="/" element={<LoginPage handleLogin={handleLogin}/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
