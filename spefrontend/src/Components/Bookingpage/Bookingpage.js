import React, { useState, useEffect } from "react";
import { GoPlusCircle } from "react-icons/go";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";


import './Pbook.css';
import { useLocation } from 'react-router-dom';
function PBookNow() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [reasonVal, setReasonVal] = useState("");
  const [step, setStep] = useState(1);
  const [dateOptions, setDateOptions] = useState([]);
  const [sltime, setSltime] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [selectedTable, setSelectedTable] = useState();
  const [table1, setTable1] = useState('');
  const [table2, setTable2] = useState('');
  const [table3, setTable3] = useState('');
  const location = useLocation();

  useEffect(() => {
    // fetchTables();
    setMinDate(getMinDate());
  }, []);

//   useEffect(() => {
//     if (selectedTable && selectedDate) {
//       fetchTimeSlots();
//     }
//   }, [selectedTable, selectedDate]);

  const selectedRestaurantId = localStorage.getItem('book');
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

    const options = [];
    let i = 0;
    while (options.length < 7) {
        const date = new Date(tomorrow);
        date.setDate(date.getDate() + i); // Add days to tomorrow's date
        
        // Exclude Saturdays and Sundays
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            const formattedDate = date.toISOString().split('T')[0];
            const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
            options.push({ date: formattedDate, day: day });
        }
        i++;
    }
    setDateOptions(options);
}, []);
let timeselected;

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem("token");
    
      console.log(selectedRestaurantId);
      console.log(typeof(selectedRestaurantId));
      console.log(timeselected);
      console.log(selectedDate);
      const hotelid = parseInt(selectedRestaurantId);
      const response = await axios.get(
        `http://localhost:8080/restaurants/getavailabletables`,
        {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        params: {
            resId: hotelid,
            date: selectedDate,
            time: timeselected,
        }
        }
        
      );
      const bookings = response.data;
      console.log(bookings);

    // Initialize table counts for each type
        let tableCount1 = 100;
        let tableCount2 = 100;
        let tableCount3 = 100;

    // Calculate available table counts based on bookings
    bookings.forEach(booking => {
      if (booking.tabletype === 1) {
        tableCount1--;
      } else if (booking.tabletype === 2) {
        tableCount2--;
      } else if (booking.tabletype === 3) {
        tableCount3--;
      }
    });
      setTable1(tableCount1);
      setTable2(tableCount2);
      setTable3(tableCount3);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Handle error
    }
  };

//   const fetchTimeSlots = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:8080/hotel/time-slots`,
//         {
//           params: {
//             resId: selectedRestaurantId,
//             date: selectedDate,
//           }
//         }
//       );
//       console.log("Response from server:", response.data); // Log response data
//       if (Array.isArray(response.data)) {
//         const fetchedTimeSlots = response.data;
//         const allTimeSlots = generateTimeSlots();
//         const availableTimeSlots = allTimeSlots.filter(
//           (slot) => !fetchedTimeSlots.includes(slot)
//         );
//         setTimeSlots(availableTimeSlots);
//       } else {
//         console.error("Error: Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching time slots:", error);
//       // Handle error
//     }
//   };

  const handleDoctorChange = (tabletype) => {
    setSelectedTable(tabletype);
    console.log(tabletype);
    setStep(4);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleReasonChange = (event) => {
    setReasonVal(event.target.value);
    // setStep(2);
  };
  
  const handleTimeSlotChange = (slot) => {
    const selectedTimeString = slot;
    const [hours, minutes] = selectedTimeString.split(":");
    const selectedTime = new Date();
    selectedTime.setHours(parseInt(hours));
    selectedTime.setMinutes(parseInt(minutes));
    setSelectedTimeSlot(selectedTimeString); 
    timeselected = selectedTimeString;
    console.log(selectedTimeString);// Store as string
    setStep(4);
    fetchTables();
};

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
useEffect(()=> {
  const generateTimeSlots = () => {
    const startTime1 = 11 * 60;
    const endTime1 = 23 * 60;
    const interval1 = 90;

    const slots = [];

    for (let time = startTime1; time < endTime1; time += interval1) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const formattedTime = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      slots.push(formattedTime);
    }
    setTimeSlots(slots);
    console.log(slots);
    return slots;
  };
  generateTimeSlots();
},[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const patientId = localStorage.getItem('customerId');
    console.log(patientId);
    const date = new Date(selectedDate);
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const sltime = new Date(dateString + 'T' + selectedTimeSlot);
    const reason = reasonVal;
    sltime.setSeconds(0);
    const time = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(sltime);
    console.log(time);
    try {
      await axios.post(
        "http://localhost:8080/restaurants/book-apt",
        {
          customer: { id: patientId },
          restaurant: { id: parseInt(selectedRestaurantId) },
          date,
          time,
          tabletype: selectedTable,
        },
        {
          withCredentials: true
        }
      );
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTimeSlot("");
      console.log("Successful");
      toast.success("Appointment Booked Succesfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    } catch (error) {
      toast.error("Error occurred while booking appointment");
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="book-page">
      <div className="book-content">
      <p className='head' style={{fontSize:'22px', textAlign:'center', 'marginBottom':'20px'}}><b>Grab a Table!</b></p>
            <form className='pform' onSubmit={handleSubmit}>
            {step >= 1 && (
                    <div className="pform-group">
                        <label htmlFor="selectDate" className='label2'>Pick a Date</label>
                        <div className="date-container date-list">
                            {dateOptions.map(({ date, day }) => (
                                <div className={`date ${selectedDate === date ? 'selected' : ''}`} key={date} onClick={() => handleDateChange(date)}>
                                    <p><b>{date}</b> ({day})</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {step >= 2 && (
                    <div className="pform-group">
                        <label htmlFor="selectTimeSlot" className='label2'>Pick a Time Slot</label>
                        <div className="time-slots-list">
                            {timeSlots.map(slot => (
                                <div className={`time-slot ${selectedTimeSlot === slot ? 'slcted' : ''}`} key={slot} onClick={() => handleTimeSlotChange(slot)}>
                                    <p style={{textAlign:'center'}}><b>{slot}</b></p>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                )}
                
                {step >= 2 && (
                    <div className="pform-group">
                        <label htmlFor="cause" className='label1'>Occasion</label>
                        <input 
                            type="text" 
                            id="cause" 
                            name="cause" 
                            placeholder="Mention if any special occasion" 
                            value={reasonVal} 
                            onChange={handleReasonChange}  
                        />
                    </div>
                )}
                {step >= 3 && (
                    <div className="pform-group">
                        <label htmlFor="selectDoctor" className='label2'>Select Table Size</label>
                        <div className="doctors-list">
                            <div className={`table ${selectedTable === 1 ? 'selected' : ''}`} key={1} onClick={() => handleDoctorChange(1)}>
                                    <p><b>Table 1</b></p>
                                    <p><b>Count:</b> {table1}</p>
                                </div>
                                <div className={`table ${selectedTable === 2 ? 'selected' : ''}`} key={2} onClick={() => handleDoctorChange(2)}>
                                    <p><b>Table 2</b></p>
                                    <p><b>Count:</b> {table2}</p>
                                </div>
                                <div className={`table ${selectedTable === 3 ? 'selected' : ''}`} key={3} onClick={() => handleDoctorChange(3)}>
                                    <p><b>Table 3</b></p>
                                    <p><b>Count:</b> {table3}</p>
                                </div>
                        </div>
                    </div>
                )} 
                {step === 4 && (
                    <div className="pform-group">
                        <button className='book-btn' type="submit">Book Table<GoPlusCircle /></button>
                    </div>
                )}
            </form>
            <ToastContainer />
        </div>

      </div>
    </>
  );
}

export default PBookNow;