// src/components/TypingGame.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TypingGame.css'; // Ensure you have this CSS file

const TypingGame = () => {
  const navigate = useNavigate();
  const levels = Array.from({ length: 30 }, (_, index) => index + 1);
  const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];

  const handleLevelClick = (level) => {
    // Check if the user has completed the previous level or if it's the first level
    if (level === 1 || completedLevels.includes(level - 1)) {
      navigate(`/level/${level}`);
    } else {
      alert(`You must complete Level ${level - 1} first!`);
    }
  };

  return (
    <div className="typing-game">
      <h1>Typing Game Challenge</h1>
      <p>Choose a level and start typing to improve your skills!</p>
      <div className="grid-container">
        {levels.map(level => (
          <div
            className={`grid-item ${completedLevels.includes(level) ? 'completed' : ''}`}
            key={level}
            onClick={() => handleLevelClick(level)}
            style={{
              pointerEvents: completedLevels.includes(level - 1) || level === 1 ? 'auto' : 'none',
              opacity: completedLevels.includes(level - 1) || level === 1 ? 1 : 0.5,
            }}
          >
            <div className="level-content">
              <h2>Level {level}</h2>
              <p>{completedLevels.includes(level) ? 'Completed!' : `Complete Level ${level - 1} first.`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypingGame;
