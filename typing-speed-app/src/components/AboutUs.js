// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to MyApp! We are dedicated to enhancing your typing skills through innovative tools and engaging challenges.</p>
      </header>

      <section className="about-us-content">
        <div className="section mission">
          <h2>Our Mission</h2>
          <p>Our mission is to provide engaging and effective typing practice to help users improve their typing speed and accuracy.</p>
        </div>

        <div className="section team">
          
          <div className="team-info">
            <img 
              src="https://tse1.mm.bing.net/th?id=OIP.gvWmKdvNZeRd4BWd2FJ5TAHaFi&pid=Api&P=0&h=180" 
              alt="Our Team" 
              className="team-image" 
            />
            <p>Our team is made up of passionate professionals committed to delivering the best typing experience possible.</p>
          </div>
        </div>

        <div className="section history">
          <h2>Our History</h2>
          <p>Founded in 2021, MyApp has rapidly grown from a small project to a prominent platform for typing improvement. Our journey has been fueled by our dedication to helping users achieve their typing goals.</p>
        </div>

        <div className="section contact">
          <h2>Contact Us</h2>
          <p>For any questions or feedback, please <a href="mailto:info@myapp.com">email us</a> or follow us on our social media channels.</p>
        </div>
      </section>

      <div className="carousel">
        <div className="carousel-inner">
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/vectors/hand-typing-on-laptop-vector-flat-cartoon-illustration-vector-id618981484?k=6&m=618981484&s=612x612&w=0&h=NRffts9w2CqiN1mZzSbQQ5aq8QFBl9RB1Qo-p061neM=" alt="Typing on Laptop" />
            <p className="carousel-caption">"Speed is the essence of typing. Improve yours with us!"</p>
          </div>
          <div className="carousel-item">
            <img src="https://tse2.mm.bing.net/th?id=OIP.qdAW1TjCN57h1lbuuzvchgHaFj&pid=Api&P=0&h=180" alt="Typing Illustration" />
            <p className="carousel-caption">"Master the art of typing with precision and speed."</p>
          </div>
          <div className="carousel-item">
            <img src="https://tse3.mm.bing.net/th?id=OIP.4SxSK2NJuDPM5kL97NGcyAHaGE&pid=Api&P=0&h=180" alt="Keyboard Practice" />
            <p className="carousel-caption">"Practice makes perfect. Type your way to success."</p>
          </div>
          <div className="carousel-item">
            <img src="https://png.pngtree.com/png-vector/20230809/ourlarge/pngtree-cartoon-style-funny-typewriter-illustration-with-glasses-vector-png-image_6835214.png" alt="Typewriter Illustration" />
            <p className="carousel-caption">"Enhance your typing skills with fun and interactive challenges."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
