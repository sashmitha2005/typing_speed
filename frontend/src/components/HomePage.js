// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import NavBar from './NavBar'; // Ensure the path is correct
import { Carousel } from 'react-bootstrap'; // Import Carousel component
import './HomePage.css'; // Import the CSS for styling

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handlers for navigation
  const handleGameClick = () => {
    navigate('/typing-game'); // Navigate to the TypingGame page
  };

  const handleCompetitionClick = () => {
    navigate('/welcome'); // Navigate to the WelcomePage
  };

  const handleTypingSpeedDrillClick = () => {
    navigate('/typing-drill'); // Navigate to the TypingDrillPage
  };

  const handleTypingToolsClick = () => {
    navigate('/freestyle'); // Navigate to the Freestyle page
  };

  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}

      <Carousel className="carousel" interval={3000}> {/* Set interval to 3000ms (3 seconds) */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://tse1.mm.bing.net/th?id=OIP.VXiPYCKOVcApwIN5OVGxPAHaD8&pid=Api&P=0&h=180"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://beebom.com/wp-content/uploads/2021/04/typingtest.com_.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://tse3.mm.bing.net/th?id=OIP.JVq2kqSdZSRsj9nqExEmLAHaEP&pid=Api&P=0&h=180"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://tse1.mm.bing.net/th?id=OIP.BXhYOZFDtrHnSXRvENrQugHaDt&pid=Api&P=0&h=180"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://tse4.mm.bing.net/th?id=OIP.TxN3DmgkfJHy51iEQVEZKAHaEl&pid=Api&P=0&h=180"
            alt="Fifth slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="home-container">
        <div className="grid-item game" onClick={handleGameClick}>
          <h2>Quest</h2>
          <p>Explore our engaging typing game designed to improve your typing skills.</p>
        </div>
        <div className="grid-item competition" onClick={handleCompetitionClick}>
          <h2>Contest</h2>
          <p>Participate in exciting typing speed competitions and challenge your friends.</p>
        </div>
        <div className="grid-item typing-speed" onClick={handleTypingSpeedDrillClick}>
          <h2>Frees</h2>
          <p>Short, timed drills where users type random words or sentences.</p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Learn more about our mission and values.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@shash.com</p>
          <p>Phone: +1-234-567-890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p><a href="#">Facebook</a></p>
          <p><a href="#">Twitter</a></p>
          <p><a href="#">Instagram</a></p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
