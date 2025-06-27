// src/pages/Quiz.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../quiz_questions.json';
import quizImages from '../assets/quizImages';
import celebrationSound from '../assets/celebration.mp3';
import quizMusic from '../assets/quiz-bgm.mp3';
import confetti from 'canvas-confetti';
import './Quiz.css';

const getRandomQuestions = (num) => {
  const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const timerRef = useRef(null);
  const bgmRef = useRef(null);

  useEffect(() => {
    const randomQ = getRandomQuestions(10);
    setQuestions(randomQ);
    setSelectedAnswers(Array(10).fill(null));
  }, []);

  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio(quizMusic);
      bgmRef.current.loop = true;
    }

    if (score === null) {
      bgmRef.current.volume = isMuted ? 0 : 0.3;
      bgmRef.current.play().catch(() => {});
    } else {
      bgmRef.current.pause();
    }

    return () => {
      bgmRef.current?.pause();
      bgmRef.current.currentTime = 0;
    };
  }, [isMuted, score]);

  const handleExit = () => {
    if (window.confirm('Do you want to exit?')) {
      bgmRef.current?.pause();
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSelect = (opt) => {
    if (score !== null) return;
    const updated = [...selectedAnswers];
    updated[index] = opt;
    setSelectedAnswers(updated);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handleViewScore = useCallback(() => {
    let total = 0;
    selectedAnswers.forEach((ans, i) => {
      if (ans === questions[i].answer) total++;
    });
    setScore(total);

    if (total > 7) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      const audio = new Audio(celebrationSound);
      audio.play();
    }

    bgmRef.current?.pause();

    setTimeout(() => {
      navigate('/score', {
        state: { questions, selectedAnswers, score: total }
      });
    }, 1500);
  }, [navigate, questions, selectedAnswers]);

  useEffect(() => {
    if (score !== null) return;

    clearInterval(timerRef.current);
    setTimeLeft(15);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (index < 9) {
            setIndex((i) => i + 1);
          } else {
            handleViewScore();
          }
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [index, score, handleViewScore]);

  if (questions.length === 0) return <div>Loading...</div>;
  const current = questions[index];

  return (
    <div className="quiz-container">
      <button className="exit-btn" onClick={handleExit}>Exit</button>
      <button className="mute-btn" onClick={handleMuteToggle}>
        {isMuted ? '🔇' : '🔊'}
      </button>

      <div className={`timer-display ${timeLeft <= 5 ? 'low-time' : ''}`}>
        {timeLeft}s
      </div>

      <div className="quiz-left question-wrapper">
        <h2 className="quiz-title">{index + 1}. {current.question}</h2>
        <div className="quiz-options">
          {current.options.map((opt, i) => {
            const isSelected = selectedAnswers[index] === opt;
            const isCorrect = score !== null && opt === current.answer;
            const isWrong = score !== null && isSelected && opt !== current.answer;

            return (
              <button
                key={i}
                className={`quiz-input 
                  ${isSelected ? 'selected' : ''} 
                  ${isCorrect ? 'correct' : ''} 
                  ${isWrong ? 'wrong' : ''}
                `}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-right">
  <img
    key={index} // 👈 this triggers re-render + animation every time index changes
    src={quizImages[index % quizImages.length]}
    alt={`Q${index + 1}`}
    className="quiz-mascot"
  />
</div>


      {!(index === 9 && score !== null) && (
        <button className="prev-btn" onClick={handlePrev}>Previous</button>
      )}

      {index < 9 && score === null && (
        <button className="next-btn" onClick={handleNext}>Next</button>
      )}

      {index === 9 && score === null && (
        <button className="next-btn" onClick={handleViewScore}>View Score</button>
      )}
    </div>
  );
};

export default Quiz;
