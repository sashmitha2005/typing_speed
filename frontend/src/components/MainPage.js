import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { Modal } from 'react-bootstrap';
import './MainPage.css'; // Import CSS for styling

const MainPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  // Define the onLoginSuccess function
  const handleLoginSuccess = () => {
    // Code to handle login success
    console.log('Login successful!');
  };

  return (
    <div className="main-page">
      <h1 className="website-name">Shash</h1> {/* Website name */}

      <button className="login-button" onClick={handleShowLogin}>Login</button>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm 
            handleClose={handleCloseLogin} 
            onLoginSuccess={handleLoginSuccess} // Pass the function here
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainPage;
