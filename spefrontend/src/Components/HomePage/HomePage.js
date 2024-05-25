import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
const HomePage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const [hotelsData,sethotelsData] = useState([]);
  const [nooftables,setnooftables] = useState();
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchhotels = async () => {
      const response = await axios.get(`http://localhost:8080/restaurants/tablecountgtzero`);
      const hotels = response.data;
      // Fetch images for each hotel
      const hotelsWithImages = await Promise.all(hotels.map(async (hotel) => {
        try {
          // Replace 'image.jpg' with the actual filename of the hotel's image
          const imageResponse = await axios.get(`http://localhost:8080/restaurants/download/${hotel.restImage}`, { responseType: 'arraybuffer' });
          let image = btoa(
            new Uint8Array(imageResponse.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          // Add image data to hotel object
          return { ...hotel, image: `data:${imageResponse.headers['content-type'].toLowerCase()};base64,${image}` };
        } catch (error) {
          console.error('Error fetching image for hotel', hotel.id, error);
          // Return hotel data without image in case of an error
          return hotel;
        }
      }));
  
      sethotelsData(hotelsWithImages);
    };
  
    fetchhotels();
  }, []);
  
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
    <Navbar/>
      <div className="home-img">
        <div className="caption">
        </div>
      </div>
      <div className="hotel-grid">
        {hotelsData.map((hotel) => (
          <div key={hotel.id} className="hotel-card" onClick={() => handleBookNow(hotel.id)}>
            <img src={hotel.image} alt={hotel.name} />
            <div>
              <div className="name-rate">
                <h3>{hotel.name}</h3>
                <span className='hrating'>{hotel.rating}
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="0.8rem" height="0.8rem" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" class="sc-rbbb40-0 fauQLv"><title>star-fill</title><path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z"></path></svg>
                </span>
              </div>
              <div className="button-container">
                {/* <button className="details" onClick={() => handleDetails(hotel)}>Details</button>  */}
                <span>{hotel.location}, Bengaluru</span>
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
