// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import AdminLoginForm from './components/AdminLoginForm';
import WelcomePage from './components/WelcomePage';
import NextPage from './components/NextPage';
import ResultPage from './components/ResultPage';
import ResultView from './components/ResultView';
import AdminPage from './components/AdminPage';
import SignUpPage from './components/SignUpPage';
import TypingGame from './components/TypingGame';
import LevelPage from './components/LevelPage';
import TypingDrillPage from './components/TypingDrillPage';
import HomePage from './components/HomePage'; // Import HomePage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordModal />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/nextpage" element={<NextPage />} />
        <Route path="/resultpage" element={<ResultPage />} />
        <Route path="/resultview" element={<ResultView />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/typing-game" element={<TypingGame />} />
        <Route path="/level/:level" element={<LevelPage />} />
        <Route path="/typing-drill" element={<TypingDrillPage />} />
        <Route path="/home" element={<HomePage />} /> {/* Add route for HomePage */}
      </Routes>
    </Router>
  );
};

export default App;
