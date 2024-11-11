// src/components/PerformanceAnalytics.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './PerformanceAnalytics.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const PerformanceAnalytics = ({ data }) => {
  const labels = data.map(entry => entry.time);
  const speedData = data.map(entry => entry.speed);
  const accuracyData = data.map(entry => entry.accuracy);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Typing Speed (WPM)',
        data: speedData,
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'Accuracy (%)',
        data: accuracyData,
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        fill: true,
      }
    ]
  };

  return (
    <div className="performance-analytics">
      <h2>Performance Analytics</h2>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default PerformanceAnalytics;
