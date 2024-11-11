// src/components/SignUpPage.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    education: '',
    phoneNumber: '',
    typingExperience: '',
    password: '',
    confirmPassword: '',
    interests: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username) newErrors.username = "Username is required";
    else if (!/^[a-zA-Z]+$/.test(formData.username)) newErrors.username = "Username must contain only letters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email must be in a valid format";

    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age <= 0) newErrors.age = "Age must be a positive number";

    if (!formData.education) newErrors.education = "Education is required";

    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be exactly 10 digits";

    if (formData.password && formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords must match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }));
      alert("Sign-up successful!");
      navigate('/'); // Redirect to the home page
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            name="username" 
            placeholder="Enter username" 
            value={formData.username} 
            onChange={handleChange}
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
            name="email" 
            placeholder="Enter email" 
            value={formData.email} 
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control 
            type="number" 
            name="age" 
            placeholder="Enter age" 
            value={formData.age} 
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEducation">
          <Form.Label>Education</Form.Label>
          <Form.Control 
            type="text" 
            name="education" 
            placeholder="Enter education" 
            value={formData.education} 
            onChange={handleChange}
            isInvalid={!!errors.education}
          />
          <Form.Control.Feedback type="invalid">
            {errors.education}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
            type="text" 
            name="phoneNumber" 
            placeholder="Enter phone number" 
            value={formData.phoneNumber} 
            onChange={handleChange}
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formTypingExperience">
          <Form.Label>Typing Experience</Form.Label>
          <Form.Control 
            type="text" 
            name="typingExperience" 
            placeholder="Enter typing experience" 
            value={formData.typingExperience} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            placeholder="Enter password" 
            value={formData.password} 
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm password" 
            value={formData.confirmPassword} 
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formInterests">
          <Form.Label>Interests</Form.Label>
          <Form.Control 
            type="text" 
            name="interests" 
            placeholder="Enter interests" 
            value={formData.interests} 
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignUpPage;
