import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { token } = response.data;

        // Store JWT token in localStorage
        localStorage.setItem('token', token);

        alert("Login successful!");
        handleClose(); // Close the modal
        navigate('/home'); // Redirect to HomePage
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ global: error.response.data.message });
        } else {
          setErrors({ global: 'An unexpected error occurred. Please try again.' });
        }
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
        {errors.global && <div className="alert alert-danger">{errors.global}</div>}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default LoginForm;
