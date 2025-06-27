import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Review.css';
import exitIcon from '../assets/exit.png';

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { questions, selectedAnswers, score } = state || {};

  if (!questions || !selectedAnswers) {
    return <div>No review data available</div>;
  }

  const handleExit = () => {
    navigate('/score', { state: { score, questions, selectedAnswers } });
  };

  return (
    <div className="review-flex-wrapper">
      <div className="review-inner">
        <button className="review-exit" onClick={handleExit}>
          <img src={exitIcon} alt="Exit" />
        </button>

        <h2 className="review-title">📋 Answer Review</h2>
        <h3 className="review-score">Score: {score} / 10</h3>

        <div className="review-scroll">
          {questions.map((q, idx) => (
            <div key={idx} className="review-item">
              <h4>{idx + 1}. {q.question}</h4>
              <ul className="review-options">
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswers[idx] === opt;
                  const isCorrect = opt === q.answer;

                  return (
                    <li
                      key={i}
                      className={`review-option ${isCorrect ? 'correct' : ''} ${isSelected && !isCorrect ? 'wrong' : ''}`}
                    >
                      {opt}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
