import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './TypingDrillPage.css';

const TypingDrillPage = ({ currentUser }) => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [performanceData, setPerformanceData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [timer, setTimer] = useState(300); // Timer set to 5 minutes (300 seconds)
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);

  const userKey = `user_${currentUser}`;

  // List of paragraphs for daily practice
  const practiceParagraphs = [
    'Crafting a visually appealing and interactive web page requires a thoughtful blend of design principles and functionality. By incorporating modern UI elements such as dynamic backgrounds, responsive typography, and interactive features, a page can engage users more effectively.',
    'Enhancements like animated buttons, progress bars, and real-time feedback not only improve the user experience but also create a sense of accomplishment, especially in tasks like typing tests. Additionally, integrating achievement badges or similar rewards can motivate users to perform better.',
    'A well-designed page should be intuitive, attractive, and rewarding. Incorporating user feedback, personalized elements, and interactive content can further elevate the design and functionality of the page.',
    'Modern web design must also ensure accessibility, ensuring that all users can navigate the page with ease. From voice commands to high contrast color schemes, making a site accessible is key to offering a great user experience.',
    'Incorporating animations in a subtle and thoughtful manner can greatly enhance a user’s interaction with the page. These can be used to provide visual feedback or emphasize important elements without overwhelming the user.',
    'The primary goal of any web design is to make the content accessible and engaging. Ensuring that users can interact with elements such as buttons, forms, and navigation menus is crucial for a seamless experience.',
    'One of the key principles in user interface design is consistency. A consistent layout, familiar patterns, and predictable behavior help users feel comfortable and navigate through a site with ease.',
    'Speed and performance play an integral role in web design. Optimizing assets, minimizing load times, and ensuring smooth interactions can significantly impact user satisfaction and engagement.',
    'Interactive elements such as hover effects, drag-and-drop features, and dynamic content updates keep users engaged. They help create an experience that is not only functional but enjoyable.',
    'Modern websites often integrate multimedia elements like images, videos, and animations to enhance the user experience. When used thoughtfully, these elements can help communicate the message more effectively.',
    'The art of web design involves both creativity and technical skills. A designer must understand the needs of the user, the objectives of the site, and the limitations of the technology being used.',
    'Responsive design is essential in today’s mobile-first world. Websites should look and function well on all devices, adjusting to various screen sizes and orientations.',
    'Designing with accessibility in mind is more important than ever. Websites must be usable by everyone, including individuals with disabilities, and be optimized for assistive technologies like screen readers.',
    'Great web design balances aesthetics with functionality. An attractive design that also provides a smooth, user-friendly experience will keep visitors coming back to the site.'
  ];

  // Shuffle function to randomize sentences or paragraphs order
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem(userKey)) || {};
    const savedStreak = savedUserData.dailyStreak || 0;
    const savedPerformance = savedUserData.performanceData || {};
    const savedTheme = savedUserData.darkMode || false;

    setDailyStreak(savedStreak);
    setPerformanceData(savedPerformance);
    setDarkMode(savedTheme);

    const today = new Date().toDateString();
    const lastPracticeDate = savedUserData.lastPracticeDate;

    if (lastPracticeDate !== today) {
      setDailyStreak(0);
      updateUserData({ dailyStreak: 0 });
    }
  }, [userKey]);

  useEffect(() => {
    let timerInterval;
    if (isSessionActive) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            setIsSubmitButtonEnabled(true); // Enable submit button when time is up
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isSessionActive]);

  useEffect(() => {
    if (isSessionActive) {
      setTimer(300); // Reset timer to 5 minutes when a new session starts
      setIsSubmitButtonEnabled(false);
    }
  }, [isSessionActive]);

  useEffect(() => {
    if (typedText === lines[currentLineIndex]) {
      if (currentLineIndex < lines.length - 1) {
        // Move to the next line
        setCurrentLineIndex(currentLineIndex + 1);
        setTypedText(''); // Clear the typed text for the next line
      } else {
        // User has completed all lines
        setIsSubmitButtonEnabled(true); // Enable the submit button
      }
    }
  }, [typedText, lines, currentLineIndex]);

  const updateUserData = (data) => {
    const existingData = JSON.parse(localStorage.getItem(userKey)) || {};
    const updatedData = { ...existingData, ...data };
    localStorage.setItem(userKey, JSON.stringify(updatedData));
  };

  const getRandomParagraphForSession = () => {
    const randomParagraph = practiceParagraphs[Math.floor(Math.random() * practiceParagraphs.length)];
    const sentences = randomParagraph.split('.').map(sentence => sentence.trim()).filter(sentence => sentence);
    shuffleArray(sentences); // Shuffle the sentences for random order
    return sentences;
  };

  const startSession = () => {
    const dailyText = getRandomParagraphForSession(); // Get random text for the session
    setLines(dailyText); // Set shuffled lines
    setTypedText('');
    setCurrentLineIndex(0);
    setIsSessionActive(true);
    setIsSubmitButtonEnabled(false); // Hide submit button at the start
  };

  const handleTextChange = (e) => {
    setTypedText(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    updateUserData({ darkMode: !darkMode });
  };

  const handleSubmit = () => {
    setIsSessionActive(false);
    handleSessionEnd();
  };

  const handleSessionEnd = () => {
    const today = new Date().toDateString();
    const newPerformanceData = { ...performanceData, [today]: (performanceData[today] || 0) + typedText.length };

    setPerformanceData(newPerformanceData);
    updateUserData({ performanceData: newPerformanceData, lastPracticeDate: today });

    const newStreak = dailyStreak + 1;
    setDailyStreak(newStreak);
    updateUserData({ dailyStreak: newStreak });
  };

  const getPerformanceData = () => {
    const labels = [];
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      labels.push(dateString);
      data.push(performanceData[dateString] || 0);
    }
    return { labels, data };
  };

  const { labels, data } = getPerformanceData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Typing Performance',
        data,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const getHighlightedText = () => {
    const currentLine = lines[currentLineIndex] || '';
    let result = '';
    
    for (let i = 0; i < currentLine.length; i++) {
      const typedChar = typedText[i] || '';
      const lineChar = currentLine[i] || '';
      
      if (typedChar === lineChar) {
        result += `<span style="color: green;">${typedChar}</span>`;
      } else {
        result += `<span style="color: red;">${typedChar}</span>`;
      }
    }
    
    result += currentLine.slice(typedText.length).split('').map(c => `<span style="color: gray;">${c}</span>`).join('');
    return result;
  };

  return (
    <div className={`typing-drill-page ${darkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="session-selection">
        <h1>Typing Practice Sessions</h1>
        <button className="btn-primary" onClick={startSession} disabled={isSessionActive}>Start New Session</button>
      </div>
      <div className="typing-session">
        <div className="typing-session-details">
          <p className="text-to-type">
            {lines.slice(0, currentLineIndex + 1).join('. ')}
          </p>
          <textarea
            className="typing-input"
            value={typedText}
            onChange={handleTextChange}
            disabled={!isSessionActive}
            placeholder="Start typing here..."
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
        </div>
        <div className="typed-display" dangerouslySetInnerHTML={{ __html: getHighlightedText() }}></div>
        <div className="controls">
          {isSubmitButtonEnabled && (
            <button className="btn-primary" onClick={handleSubmit}>Submit</button>
          )}
        </div>
        <div className="timer">
          <h2>Time Left</h2>
          <p>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
        </div>
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={Object.keys(performanceData).map(date => ({
              title: 'Typing Practice',
              date,
              backgroundColor: '#007bff',
            }))}
          />
        </div>
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default TypingDrillPage;
