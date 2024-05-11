import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styles
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    // Check if username or password is empty
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    e.preventDefault();
    console.log(email);
    const response = await axios.post('http://localhost:8080/auth/login', {
      email: email,
      password: password,
    });        
    // Clear any previous error
    setError('');

    // Call handleLogin if fields are not empty
    if(response.data === "Login Successfull!")
      {
        const response = await axios.get(`http://localhost:8080/customer/getid?cemail=${email}`);
        console.log(response.data);
        localStorage.setItem('customerId', response.data);
        handleLogin(email, password);
        navigate('/home');
      }
      else{
        console.log(response.data);
      }
  };

  const handleRegisterClick = () => {
    // Switch to Register mode
    setIsRegistering(true);
  };

  const handleBackToLoginClick = () => {
    // Switch back to Login mode
    setIsRegistering(false);
    // Clear input fields and error message
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleRegisterSubmit = async(e) => {
    // Handle registration logic here
    e.preventDefault();
    const response = await fetch('http://localhost:8080/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
        console.log(response.data);
    handleBackToLoginClick();
  };
  

  if (isRegistering) {
    return (
      <div className="login-background">
        <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className='form-cont' onSubmit={handleRegisterSubmit}>
        <input
            type="text"
            className="register-input"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Add onChange event handler for email input
          />
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="register-input"
            placeholder="Re-enter Password"
            // Add state and onChange event handler for re-enter password input
          />
          <div className="btns">
            <button type="submit" className="register-button">Register</button>
            <button onClick={handleBackToLoginClick} className="back-to-login-button">Back to Login</button>
          </div>
        </form>
        
        {/* <span>Already Registered? <a href="" onClick={handleBackToLoginClick}>Sign In</a></span> */}
      </div>
      </div>
    );
  }

  // Render Login page by default
  return (
      <div className="login-background">
      <div className="login-container">
      <h1 className="login-title">Sign In</h1>
      {error && <p style={{"color":"red"}} className="error-message">{error}</p>}
      <form className='form-cont' onSubmit={handleFormSubmit}>    
      <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btns">
          <button type="submit" className="login-button">Login</button>
          <button onClick={handleRegisterClick} className="register-link">Register</button>
        </div>
      </form>
      {/* <span>Don't have an account? <a href="" onClick={handleRegisterClick}>SignUp</a></span> */}
    </div>
    </div>
  ) ;
};

export default LoginPage;
