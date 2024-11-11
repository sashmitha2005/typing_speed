// src/components/NavBar.js
import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpPage from './SignUpPage';
import './NavBar.css'; // Import CSS for styling

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowSignUp = () => setFormType('signup');
  const handleShowLogin = () => setFormType('login');

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Shash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            
         
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{formType === 'login' ? 'Login' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === 'login' ? (
            <LoginForm handleClose={handleCloseModal} onLoginSuccess={() => {}} />
          ) : (
            <SignUpPage handleClose={handleCloseModal} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {formType === 'login' ? (
            <Button variant="primary" onClick={handleShowSignUp}>Sign Up</Button>
          ) : (
            <Button variant="primary" onClick={handleShowLogin}>Login</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
