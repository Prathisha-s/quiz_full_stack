// src/pages/Score.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Score.css';
import exitIcon from '../assets/exit.png';
import happyGif from '../assets/happy.png';   // 😊 for score > 6
import okayGif from '../assets/okay.png';     // 😐 for score <= 6

const Score = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, questions, selectedAnswers } = state || {};

  if (score === undefined) {
    return <div>No score data available.</div>;
  }

  const handlePlayAgain = () => {
    navigate('/quiz');
  };

  const handleReview = () => {
    navigate('/review', {
      state: { score, questions, selectedAnswers }
    });
  };

  return (
    <div className="score-container">
      {/* Exit button top-left */}
      <button className="score-exit" onClick={() => navigate('/')}>
        <img src={exitIcon} alt="Exit" />
      </button>

      {/* Left side content */}
      <div className="score-left">
        <h2 className="score-title">🎉 Quiz Completed!</h2>
        <p className="score-result">Your Score: <strong>{score}</strong> / 10</p>

        <div className="score-buttons">
          <button className="text-btn" onClick={handlePlayAgain}>Play Again</button>
          <button className="text-btn" onClick={handleReview}>Review Answers</button>
        </div>
      </div>

      {/* Right side GIF (conditional) */}
      <div className="score-right">
        <img
          src={score > 6 ? happyGif : okayGif}
          alt="Celebration"
          className="score-animation"
        />
      </div>
    </div>
  );
};

export default Score;
