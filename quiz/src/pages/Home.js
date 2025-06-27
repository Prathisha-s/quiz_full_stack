// src/pages/Home.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import arrow from '../assets/arrow.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, username } = useContext(AuthContext); // 🔄 get `user` too

  const handleStart = () => {
    if (!user) {
      alert('🔒 Please log in to start the quiz!');
      return;
    }
    navigate('/quiz');
  };

  return (
    <section className="text-section">
      {username && (
        <h3 className="greeting animate-greet">
          Hi, <span className="username-highlight">{username}</span> 👋
        </h3>
      )}

      <h1 className="title">Retro Quiz</h1>

      <article className="subtitle">
        <h3>Why Quizzes Are Important for Children</h3>
        <ul>
          <li><strong>✔️ Boosts Memory & Recall:</strong> Repeated quiz practice helps children retain what they learn.</li>
          <li><strong>🎯 Improves Focus & Attention:</strong> Quizzes encourage kids to concentrate.</li>
          <li><strong>🚀 Builds Confidence:</strong> Getting answers right builds belief in themselves.</li>
          <li><strong>💡 Critical Thinking:</strong> Logical and challenging questions expand thought.</li>
          <li><strong>🌈 Makes Learning Fun:</strong> With color, motion, and interaction—it feels like play!</li>
        </ul>
        <p><strong>Let your child explore, learn, and grow—one quiz at a time!</strong></p>
      </article>

      <div className="start-container">
        <button className="start-btn" onClick={handleStart}>
          <img src={arrow} alt="Start Quiz" />
        </button>
      </div>
    </section>
  );
};

export default Home;
