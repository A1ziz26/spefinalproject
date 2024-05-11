import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";


const Patientscreen = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [apts, setApts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const patientId = localStorage.getItem('customerId');
    useEffect(() => {
        const fetchApts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/customer/getbookings?cid=${patientId}`);
                setApts(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchApts();
    },[]);

    const handleDeleteApt = async (cid) => {
        try {
          const response = await axios.put(
            `http://localhost:8080/customer/del-apt?id=${cid}`,
            
          );
          console.log(response);
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error", error.message);
          }
        }
      };

  return (
    <>
      <div className="calldoc">
        <div className="today-apt">
          <p
            style={{
              color: "var(--body_color)",
              margin: "15px 0px",
              "font-size": "18px",
            }}
          >
            {" "}
            <b>My Bookings: </b>{" "}
          </p>
          {apts.map((apt, index) => (
            <div key={index} className="apts">
              <p className="cl-apt1">
                <b>{apt.restaurant.name}</b>
              </p>
              {/* <p className='cl-apt1' ><b>Purpose: </b>{apt.reason}</p> */}
              <p className="cl-apt1">
                <b>Date: </b>
                {apt.date}
              </p>
              <p className="cl-apt1">
                <b>Time: </b>
                {apt.time}
              </p>
              <button
                style={{ color: "red" }}
                onClick={() => handleDeleteApt(apt.id)}
                className="view-btn"
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Patientscreen;
