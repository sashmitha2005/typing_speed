import React, { useState, useEffect,useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './NextPage.css';

// Function to generate 10 random meaningful words
const generateRandomWords = (numWords) => {
  const sampleWords = [
    'apple', 'banana', 'grape', 'orange', 'peach', 'mango', 'berry', 'melon', 'kiwi', 'plum',
    'lemon', 'lime', 'cherry', 'date', 'fig', 'pear', 'nectar', 'apricot', 'quince', 'plum',
    'kiwi', 'melon', 'nectar', 'papaya', 'pear', 'plum', 'raspberry', 'strawberry', 'tangerine',
    'ugli', 'vanilla', 'watermelon', 'xigua', 'yarrow', 'zucchini', 'avocado', 'blackberry',
    'cantaloupe', 'dragonfruit', 'elderberry', 'feijoa', 'grapefruit', 'honeydew', 'jackfruit',
    'kumquat', 'lime', 'mulberry', 'nectarine', 'olive', 'peach', 'quince', 'raisin'
  ];
  return Array.from({ length: numWords }, () => sampleWords[Math.floor(Math.random() * sampleWords.length)]);
};
const generateWordSearch = (words) => {
  const size = 10;
  const grid = Array(size).fill(null).map(() => Array(size).fill(''));
  const directions = ['horizontal', 'vertical', 'diagonal'];

  const placeWord = (word, x, y, direction) => {
    let dx = 0, dy = 0;

    if (direction === 'horizontal') {
      dx = 1;
    } else if (direction === 'vertical') {
      dy = 1;
    } else if (direction === 'diagonal') {
      dx = 1;
      dy = 1;
    }

    if (x + (word.length - 1) * dx >= size || y + (word.length - 1) * dy >= size) {
      return false;
    }

    for (let i = 0; i < word.length; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;

      if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
        return false;
      }

      if (grid[newY][newX] !== '' && grid[newY][newX] !== word[i]) {
        return false;
      }
    }

    for (let i = 0; i < word.length; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;
      grid[newY][newX] = word[i];
    }
    return true;
  };

  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100; // Safety mechanism to prevent infinite loop

    while (!placed && attempts < maxAttempts) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      placed = placeWord(word, x, y, direction);
      attempts++;
    }

    if (!placed) {
      console.warn(`Could not place the word "${word}" on the grid.`);
    }
  });

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === '') {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return grid;
};




const NextPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [wordSearchGrid, setWordSearchGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [wordInputs, setWordInputs] = useState(Array(5).fill('')); // Updated to 5 words
  const [feedback, setFeedback] = useState(Array(5).fill('')); // Updated to 5 words
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTypingDisabled, setIsTypingDisabled] = useState(false);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const interval=useRef(null)
  const difficulty = location.state.difficulty;
  useEffect(() => {
    if (difficulty) {
      axios.get(`http://localhost:5000/paragraphs/${difficulty}`)
        .then(response => {
          // Handle response if needed
        })
        .catch(error => {
          console.error('There was an error fetching the paragraphs!', error);
        });
    }
  }, []);

   useEffect(() => {
     if (difficulty) {
       const randomWords = generateRandomWords(10); // Keep 10 hidden words
       setWords(randomWords);
       const grid = generateWordSearch(randomWords);
      setWordSearchGrid(grid);
     }
   }, []);

  

   useEffect(()=>{
    if(!difficulty)
    {
      navigate('/welcome')
    }
   })
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsTypingDisabled(true);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (correctWordCount >= 5) { // Navigate to ResultPage.js after finding 5 words
      navigate('/resultpage', { state: { difficulty, selectedTime: '2 minutes' } });
    }
  }, [correctWordCount]);

  const handleWordChange = (index, value) => {
    const updatedInputs = [...wordInputs];
    updatedInputs[index] = value;

    const updatedFeedback = updatedInputs.map((input, idx) => {
      if (words.includes(input)) {
        return 'correct';
      } else if (input === '') {
        return '';
      } else {
        return 'incorrect';
      }
    });

    setWordInputs(updatedInputs);
    setFeedback(updatedFeedback);

    const count = updatedInputs.filter(input => words.includes(input)).length;
    setCorrectWordCount(count);
  };

  const handleRetry = () => {
    setTimeLeft(120); 
    setIsTypingDisabled(false);
    setWordInputs(Array(5).fill('')); // Reset 5 words
    setFeedback(Array(5).fill(''));
    setCorrectWordCount(0);
    const randomWords = generateRandomWords(10); // Keep 10 hidden words
    setWords(randomWords);
    const grid = generateWordSearch(randomWords);
    setWordSearchGrid(grid);
  };

  const renderGrid = () => (
    <div className="word-search-grid">
      {wordSearchGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="word-search-row">
          {row.map((cell, cellIndex) => (
            <span key={cellIndex} className="word-search-cell">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  console.log(difficulty);
  return (
    <div className="next-page">
       <Carousel activeIndex={step} controls={false} indicators={false}>
        <Carousel.Item>
          <div className="carousel-item-content">
            <h1>You have selected a difficulty level!</h1>
            <Button variant="primary" onClick={() => setStep(step + 1)}>OK</Button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-content">
            <h2>Word Search Grid</h2>
            {renderGrid()}
            <div className="word-inputs">
              <Form>
                {wordInputs.map((input, index) => (
                  <Form.Group key={index} className="mb-3">
                    <Form.Label>Word {index + 1}</Form.Label>
                    <Form.Control
                      type="text"
                      value={input}
                      disabled={isTypingDisabled}
                      onChange={(e) => handleWordChange(index, e.target.value)}
                    />
                    {feedback[index] === 'correct' && <span className="feedback correct">Correct!</span>}
                    {feedback[index] === 'incorrect' && <span className="feedback incorrect">Incorrect</span>}
                  </Form.Group>
                ))}
              </Form>
            </div>
            <div className="timer">Time Left: {timeLeft}s</div>
            <Button variant="secondary" onClick={handleRetry} disabled={isTypingDisabled}>Retry</Button>
          </div>
        </Carousel.Item>
      </Carousel> 
    </div>
  );
};

export default NextPage;
