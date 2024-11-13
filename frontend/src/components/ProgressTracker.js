// src/components/ProgressTracker.js
import React from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ typingSpeed, accuracy }) => {
  return (
    <div className="progress-tracker">
      <h2>Progress Tracker</h2>
      <div className="progress-item">
        <span className="progress-label">Typing Speed:</span>
        <span className="progress-value">{typingSpeed.toFixed(2)} WPM</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Accuracy:</span>
        <span className="progress-value">{accuracy.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
