import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from './AdminLoginForm';
import Slider from 'react-slick';
import './WelcomePage.css';

// Difficulty mapping to corresponding strings
const difficultyMapping = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

const WelcomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Handle button click to navigate to NextPage with selected difficulty
  const handleButtonClick = async(difficulty) => {
    navigate('/nextpage',{state:{difficulty : difficulty}});
  };

  // Handle opening and closing of the modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Hide arrows if not needed
    fade: true, // Add fade effect
  };

  return (
    <div className="welcome-page">
      <h1 className="welcome-text">Welcome</h1>
      <div className="grid-container">
        {Object.keys(difficultyMapping).map((difficulty) => (
          <div 
            key={difficulty} 
            className="grid-item" 
            onClick={() => handleButtonClick(difficulty)}
          >
            <h2>{difficulty}</h2>
          </div>
        ))}
      </div>

      {/* Carousel Section */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/vectors/hand-typing-on-laptop-vector-flat-cartoon-illustration-vector-id618981484?k=6&m=618981484&s=612x612&w=0&h=NRffts9w2CqiN1mZzSbQQ5aq8QFBl9RB1Qo-p061neM=" alt="Typing Illustration 1" />
            <div className="carousel-caption">"Type faster, reach farther."</div>
          </div>
          <div className="carousel-item">
            <img src="https://tse2.mm.bing.net/th?id=OIP.qdAW1TjCN57h1lbuuzvchgHaFj&pid=Api&P=0&h=180" alt="Typing Illustration 2" />
            <div className="carousel-caption">"Speed is key to efficiency."</div>
          </div>
          <div className="carousel-item">
            <img src="https://tse3.mm.bing.net/th?id=OIP.4SxSK2NJuDPM5kL97NGcyAHaGE&pid=Api&P=0&h=180" alt="Typing Illustration 3" />
            <div className="carousel-caption">"Master your typing speed."</div>
          </div>
          <div className="carousel-item">
            <img src="https://png.pngtree.com/png-vector/20230809/ourlarge/pngtree-cartoon-style-funny-typewriter-illustration-with-glasses-vector-png-image_6835214.png" alt="Typing Illustration 4" />
            <div className="carousel-caption">"Typing is an art, perfect it."</div>
          </div>
        </Slider>
      </div>

      <div className="admin-button-container">
        <button className="admin-button" onClick={handleShowModal}>
          <img src="https://tse1.mm.bing.net/th?id=OIP.7PMAWd0HXZTY3JW6AysPhAHaIm&pid=Api&P=0&h=180" alt="Admin Icon" className="admin-icon" />
          Admin
        </button>
      </div>
      <AdminLoginForm show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default WelcomePage;
