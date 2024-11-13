import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';

const LoginForm = ({ handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }
    if (!password) errors.password = "Password is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser) {
        if (username === storedUser.username && email === storedUser.email && password === storedUser.password) {
          alert("Login successful!");
          handleClose(); // Close the modal
          navigate('/home'); // Redirect to HomePage
        } else {
          setErrors({
            username: username !== storedUser.username ? "Username does not match." : "",
            email: email !== storedUser.email ? "Email does not match." : "",
            password: password !== storedUser.password ? "Password is incorrect." : ""
          });
        }
      } else {
        setErrors({ username: "No user found." });
      }
    }
  };

  const handleForgotPasswordClick = () => setShowForgotPassword(true);

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the SignUpPage
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
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
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="link" onClick={handleForgotPasswordClick}>Forgot Password?</Button>
        <Button variant="primary" type="submit">Submit</Button>
        <Button variant="link" onClick={handleSignUpClick} style={{ marginTop: '10px' }}>
          Don't have an account? Sign Up
        </Button>
      </Form>

      <ForgotPasswordModal 
        show={showForgotPassword} 
        handleClose={() => setShowForgotPassword(false)} 
      />
    </>
  );
};

export default LoginForm;