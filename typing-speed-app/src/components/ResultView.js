import React from 'react';
import { Line, Pie, Bar, Radar, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  PolarAreaController,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { useLocation } from 'react-router-dom';
import './ResultView.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  PolarAreaController,
  ArcElement,
  RadialLinearScale
);

const ResultView = () => {
  const location = useLocation();
  const {
    typingSpeed,
    accuracy,
    wpm,
    correctWords,
    incorrectWords,
    correctWordsOverTime
  } = location.state || {};

  const typingSpeedData = {
    labels: ['Typing Speed'],
    datasets: [
      {
        label: 'Words per second',
        data: [typingSpeed || 0],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const accuracyData = {
    labels: ['Accuracy', 'Incorrect'],
    datasets: [
      {
        label: 'Accuracy',
        data: [accuracy || 0, 100 - (accuracy || 0)],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const correctWordsPerMinuteData = {
    labels: ['Correct Words per Minute'],
    datasets: [
      {
        label: 'Correct Words per Minute',
        data: [(correctWords || 0) * 60 / (wpm || 1)],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const wpmData = {
    labels: ['Words per Minute'],
    datasets: [
      {
        label: 'WPM',
        data: [wpm || 0],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const incorrectWordsData = {
    labels: ['Incorrect Words'],
    datasets: [
      {
        label: 'Incorrect Words',
        data: [incorrectWords || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const correctWordsOverTimeData = {
    labels: correctWordsOverTime?.map((_, index) => `Interval ${index + 1}`) || [],
    datasets: [
      {
        label: 'Correct Words Over Time',
        data: correctWordsOverTime || [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="result-view">
      <h1>Congratulations! 🎉</h1>
      <p>Your typing speed: {typingSpeed?.toFixed(2) || 0} words per second</p>
      <p>Your accuracy: {accuracy?.toFixed(2) || 0}%</p>

      <div className="chart-container">
        <div className="chart">
          <h2>Typing Speed</h2>
          <Line data={typingSpeedData} />
        </div>
        <div className="chart">
          <h2>Accuracy</h2>
          <Pie data={accuracyData} />
        </div>
        <div className="chart">
          <h2>Correct Words per Minute</h2>
          <Bar data={correctWordsPerMinuteData} />
        </div>
        <div className="chart">
          <h2>Words per Minute</h2>
          <Radar data={wpmData} />
        </div>
        <div className="chart">
          <h2>Incorrect Words</h2>
          <PolarArea data={incorrectWordsData} />
        </div>
        <div className="chart">
          <h2>Correct Words Over Time</h2>
          <Line data={correctWordsOverTimeData} />
        </div>
      </div>
    </div>
  );
};

export default ResultView;
