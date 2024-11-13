import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LevelPage.css';

// Text examples for different levels
const texts = [
  "The sun rises in the east and sets in the west. It brings warmth and light to our world...",
  "A cat is a small, furry animal that is often kept as a pet. Cats are known for their playful behavior...",
  "A bicycle has two wheels and is powered by pedaling. It is a common way to travel short distances...",
  "Apples are a type of fruit that come in many colors, including red, green, and yellow. They are sweet and can be eaten raw or cooked. Apples are often used in pies, juices, and sauces.",
  "The ocean is a vast body of saltwater that covers most of the Earth’s surface. It is home to countless species of fish and other marine life. People use the ocean for transportation, recreation, and fishing.",
  "The sky is often blue during the day because of the way sunlight interacts with the atmosphere. At sunset, the sky can turn shades of orange, pink, and purple. The sky changes color based on the time of day and weather conditions.",
  "Dogs are known for their loyalty and companionship. They can be trained to perform various tasks, such as fetching items or guiding people. Many people keep dogs as pets because of their friendly nature.",
  "A tree is a large plant with a trunk and branches. Trees provide shade, produce oxygen, and offer homes to wildlife. They come in many types, including oak, pine, and maple.",
  "Watermelons are large fruits with a green rind and red, juicy flesh. They are a popular summer treat and are often eaten at picnics and barbecues. Watermelons contain a lot of water and are refreshing on a hot day.",
  "The library is a place where people can borrow books and other materials. Libraries offer a quiet space for reading and studying. Many libraries also host events and provide access to computers and the internet.",

  // Medium Level
  "The internet is a global network that connects millions of computers. It allows people to communicate, share information, and access resources from anywhere in the world. The internet has revolutionized the way we live and work.",
  "Volcanoes are geological formations that occur when magma from the Earth’s interior erupts through the surface. They can be explosive or effusive, depending on the type of magma and the pressure involved. Volcanoes can create new landforms and affect the climate.",
  "The human brain is an incredibly complex organ responsible for controlling thoughts, emotions, and bodily functions. It processes information from the senses and coordinates responses. The brain is essential for learning, memory, and problem-solving.",
  "Solar energy is harnessed from the sun’s rays using solar panels. It is a renewable source of energy that can power homes and businesses. Solar energy reduces reliance on fossil fuels and helps decrease greenhouse gas emissions.",
  "Ecosystems are communities of living organisms interacting with their environment. They include various habitats such as forests, deserts, and wetlands. Each ecosystem supports different types of plants and animals adapted to its specific conditions.",
  "The process of photosynthesis allows plants to convert sunlight into energy. During photosynthesis, plants absorb carbon dioxide and water and produce oxygen and glucose. This process is vital for the growth of plants and for providing oxygen to the atmosphere.",
  "The theory of evolution explains how species change over time through natural selection. According to this theory, organisms with traits better suited to their environment are more likely to survive and reproduce. This process leads to the development of new species.",
  "Climate change refers to long-term changes in temperature, precipitation, and other atmospheric conditions. Human activities, such as burning fossil fuels and deforestation, contribute to climate change. It has significant impacts on ecosystems, weather patterns, and sea levels.",
  "The periodic table organizes chemical elements based on their properties and atomic structure. Elements are arranged in rows called periods and columns called groups. This arrangement helps predict the behavior of elements and their interactions.",
  "Space exploration involves sending spacecraft and astronauts beyond Earth’s atmosphere to study the universe. It includes missions to the Moon, Mars, and other celestial bodies. Space exploration helps us understand more about our solar system and the potential for life elsewhere.",

  // Hard Level
  "Quantum mechanics is a fundamental theory in physics that describes the behavior of particles at the atomic and subatomic levels. It introduces concepts such as wave-particle duality and quantization of energy. Quantum mechanics challenges classical notions of determinism and causality.",
  "Artificial intelligence (AI) encompasses a range of technologies that enable machines to perform tasks that typically require human intelligence. This includes learning from data, recognizing patterns, and making decisions. AI has applications in fields such as robotics, natural language processing, and machine learning.",
  "The theory of relativity, proposed by Albert Einstein, revolutionized our understanding of space and time. It includes the special theory of relativity, which addresses objects moving at constant speeds, and the general theory of relativity, which deals with gravity and accelerated motion.",
  "Genetic engineering involves manipulating an organism’s DNA to achieve desired traits or outcomes. Techniques such as CRISPR allow scientists to edit genes with high precision. Genetic engineering has potential applications in medicine, agriculture, and biotechnology.",
  "The concept of entropy in thermodynamics measures the degree of disorder or randomness in a system. In any energy transfer, entropy tends to increase, leading to greater disorder. This principle underlies the second law of thermodynamics and has implications for various scientific fields.",
  "The human genome project aimed to map and sequence the entire human genome, comprising approximately 3 billion DNA base pairs. This project has provided insights into genetic variations and their role in health and disease. It has implications for personalized medicine and genetic research.",
  "Astrophysics studies celestial objects and phenomena through the application of physics principles. It includes the study of stars, galaxies, black holes, and cosmology. Astrophysics seeks to understand the origins and evolution of the universe and the fundamental forces that govern it.",
  "Behavioral economics examines the psychological factors that influence economic decision-making. It integrates insights from psychology and economics to understand how individuals deviate from rational behavior. This field explores concepts such as biases, heuristics, and the impact of social and emotional factors.",
  "The concept of computational complexity measures the efficiency of algorithms in terms of time and space. It classifies problems based on their inherent difficulty and the resources required to solve them. Understanding computational complexity is crucial for developing efficient algorithms and solving complex problems.",
  "String theory is a theoretical framework in physics that proposes that fundamental particles are not point-like but rather one-dimensional strings. It aims to reconcile quantum mechanics and general relativity by describing all particles and forces as different vibrational modes of strings. String theory has implications for understanding the fundamental nature of the universe.",
];

const LevelPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(60); // Default 60 seconds for each level
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isTypingAllowed, setIsTypingAllowed] = useState(true);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    const currentLevel = parseInt(level, 10);
    if (currentLevel > 0 && currentLevel <= texts.length) {
      setText(texts[currentLevel - 1]);
      setTimer(getInitialTimer(currentLevel));
    }
    
    // Initial setup of the timer when the component mounts
    startTimer();

    return () => {
      // Cleanup timer on component unmount
      clearInterval(timerInterval);
    };
  }, [level]);

  const getInitialTimer = (level) => {
    return 60; // Timer is 60 seconds for all levels
  };

  const startTimer = () => {
    clearInterval(timerInterval); // Clear any previous intervals to avoid overlap
    const interval = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          // Handle completion when time runs out
          setCompleted(true);
          setIsTypingAllowed(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimerInterval(interval); // Save the interval ID so we can clear it later
  };

  const handleInputChange = (e) => {
    if (isTypingAllowed) {
      setInput(e.target.value);
      calculateScore(e.target.value);
    }
  };

  const calculateScore = (currentInput) => {
    const correctText = text.slice(0, currentInput.length); // Get the part of the text the user has typed correctly
    const accuracy = (currentInput.length / text.length) * 100; // Calculate typing accuracy
    setScore(accuracy);
  };

  const handleSubmit = () => {
    if (input === text) {
      setCompleted(true);
      setIsTypingAllowed(false); // Disable typing after level completion

      // Update the local storage with completed levels
      const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
      if (!completedLevels.includes(parseInt(level, 10))) {
        completedLevels.push(parseInt(level, 10));
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
      }
    } else {
      alert('You did not complete the text correctly in time.');
    }
  };

  const handleRestart = () => {
    setCompleted(false);
    setInput('');
    setScore(0);
    setIsTypingAllowed(true); // Allow typing again after restart
    setTimer(60); // Reset the timer
    startTimer(); // Restart the timer
  };

  // Disable copy-paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <div className="level-page">
      <h1>Level {level}</h1>
      <div className="timer">
        <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60}</p>
      </div>
      <div className="text-display">
        <p>{text}</p>
      </div>
      <textarea
        value={input}
        onChange={handleInputChange}
        disabled={!isTypingAllowed || completed}
        placeholder="Type here..."
        onPaste={handlePaste} // Disable paste
      />
      <button 
        onClick={handleSubmit} 
        disabled={input !== text || completed} // Enable submit only when the input matches the text
      >
        Submit
      </button>
      <button 
        onClick={handleRestart}
        className="restart-button"
      >
        🔄 Restart
      </button>
    </div>
  );
};

export default LevelPage;
