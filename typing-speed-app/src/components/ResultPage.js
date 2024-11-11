import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';
import axios from 'axios';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty, selectedTime } = location.state;

  const [timeLeft, setTimeLeft] = useState(convertTimeToSeconds(selectedTime));
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTypingDisabled, setIsTypingDisabled] = useState(false);
  const [paragraph, setParagraph] = useState(null);
  const [correctWordsOverTime, setCorrectWordsOverTime] = useState([]);
  const [typedWordsCount, setTypedWordsCount] = useState(0); // Track typed words count
  const inputRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const fetchParagraph = async () => {
      try {
        const response = await axios.get('http://localhost:5000/paragraphs', {
          params: { "difficulty":difficulty }
        });
        if(response.status==200)
        {
        setParagraph(response.data[0]);
        }
        else{
          setParagraph("error")
        }
      } catch (error) {
        console.error('Error fetching paragraphs:', error);
        setParagraph("error")
      }
    };

    fetchParagraph();
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
        // Track correct words over time
        if (inputRef.current) {
          const correctWords = calculateResults().correctWords;
          setCorrectWordsOverTime(prev => [...prev, correctWords]);
        }
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsTimeUp(true);
      setIsTypingDisabled(true);
      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('paste', (e) => e.preventDefault());
      inputRef.current.addEventListener('copy', (e) => e.preventDefault());
      inputRef.current.addEventListener('cut', (e) => e.preventDefault());
    }
  }, []);

  useEffect(() => {
    if (typedWordsCount >= 7) {
      handleViewResult();
    }
  }, [typedWordsCount]);

  function convertTimeToSeconds(time) {
    const [value, unit] = time.split(' ');
    return unit === 'minute' || unit === 'minutes' ? parseInt(value) * 60 : parseInt(value);
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const calculateResults = () => {
    if (!paragraph) return { typingSpeed: 0, accuracy: 0, totalWords: 0, correctWords: 0, incorrectWords: 0, wpm: 0, mistakes: 0 };

    const wordsTyped = userInput.trim().split(' ').length;
    const correctWords = paragraph.text.trim().split(' ').filter((word, index) => {
      return word === userInput.trim().split(' ')[index];
    }).length;
    const totalWords = paragraph.text.trim().split(' ').length;
    const incorrectWords = wordsTyped - correctWords;
    const accuracy = (correctWords / totalWords) * 100;
    const typingSpeed = wordsTyped / convertTimeToSeconds(selectedTime); // Words per second
    const wpm = (wordsTyped / convertTimeToSeconds(selectedTime)) * 60; // Words per minute
    const mistakes = incorrectWords; // Total mistakes

    return { typingSpeed, accuracy, totalWords, correctWords, incorrectWords, wpm, mistakes };
  };

  const handleViewResult = () => {
    const results = calculateResults();
    navigate('/resultview', { state: { ...results, correctWordsOverTime } });
  };

  const getHighlightedText = () => {
    if (!paragraph) return null;

    const words = paragraph.text.split(' ');
    const inputWords = userInput.trim().split(' ');

    return words.map((word, index) => {
      const isCorrect = inputWords[index] === word;
      const className = inputWords[index] 
        ? isCorrect 
          ? 'correct' 
          : 'incorrect' 
        : '';
      return (
        <span key={index} className={`${word} ${className}`}>
          {word}{' '}
        </span>
      );
    });
  };

  const radius = 50;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / convertTimeToSeconds(selectedTime)) * circumference;

  return (
    <div className="result-page">
      <div className="text-input-wrapper">
        <div className="text-section">
          <div className="text-container" ref={textContainerRef}>
            {paragraph ? (
              <div>{getHighlightedText()}</div>
            ) : (
              <p>Loading paragraph...</p>
            )}
          </div>
        </div>
        <div className="input-section">
          <div className="countdown-clock">
            <svg
              height={radius * 2}
              width={radius * 2}
            >
              <circle
                stroke="black"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            <div className="time-text">
              {isTimeUp ? "Time's up!" : formatTime(timeLeft)}
            </div>
          </div>
          <textarea
            className="user-input"
            value={userInput}
            onChange={handleInputChange}
            disabled={isTypingDisabled}
            ref={inputRef}
            placeholder="Start typing here..."
          />
          <button className="view-result-button" onClick={handleViewResult}>View Result</button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
