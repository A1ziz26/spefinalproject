import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const [hotelsData,sethotelsData] = useState([]);
  const [nooftables,setnooftables] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchhotels = async() => {
      // Handle registration logic here
      const resonse = await axios.get(`http://localhost:8080/restaurants/tablecountgtzero`);
      sethotelsData(resonse.data);
    };

    fetchhotels();
  },[])
  const handleBookNow = (selectedrestraurant) => {
    let hotel = selectedrestraurant;
    console.log(hotel);
    localStorage.setItem('book', hotel);
    navigate('/booking');
    setIsRoomBooked(true);
  };

  const handleDetails = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseDialog = () => {
    setSelectedHotel(null);
  };

  const handleClosePopup = () => {
    setIsRoomBooked(false);
  };

  return (
    <div>
      <h1>Welcome to Aziz Hotels!</h1>
      <div className="hotel-grid">
        {hotelsData.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.imageURL} alt={hotel.name} />
            <div>
              <h3>{hotel.name}</h3>
              {/* <p>{description}</p> */}
              <div className="button-container">
                <button className="book-now"onClick={() => handleBookNow(hotel.id)}>Book Now</button>
                <button className="details" onClick={() => handleDetails(hotel)}>Details</button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Details Dialog */}
      {selectedHotel && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>{selectedHotel.name}</h2>
            {/* <p>{detailedDescriptions[selectedHotel.name] || selectedHotel.description}</p> */}
            <p>No of tables Available: {selectedHotel.tableCount}</p>
            <input type='number'
            value={nooftables}
            onChange={(e) => setnooftables(e.target.value)}/>
            <div className="popUp-button-container">
            <button className="book-now"onClick={() => handleBookNow(selectedHotel.id)}>Book Now</button>
            <button className="close" onClick={handleCloseDialog}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Room Booked Popup */}
      {isRoomBooked && (
        <div className="popup">
          <div className="popup-content">
            <p>Congratulations! Your hotel room is booked!</p>
            <button className="close" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
