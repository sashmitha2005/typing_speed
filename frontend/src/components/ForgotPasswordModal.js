import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
     
      setStep(2);
      setMessage(''); 
    } else {
      setErrors({ email: "Please enter your email address." });
    }
  };

  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
    
      setMessage("Your password has been successfully reset.");
      setStep(1); 
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="forgot-password-modal">
      <Modal.Header closeButton>
        <Modal.Title>{step === 1 ? "Forgot Password" : "Reset Password"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            {message && <div className="mt-3">{message}</div>}
          </Form>
        ) : (
          <Form onSubmit={handlePasswordResetSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Reset Password</Button>
            {message && <div className="mt-3">{message}</div>}
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
