// src/Layout.js
import React, { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { AuthContext } from './context/AuthContext';
import pencil from './assets/pencill.png';
import smiley from './assets/smiley.png';
import arrow from './assets/arrow.png';
import './App.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isHomePage = location.pathname === '/';
  const isQuizPage = location.pathname === '/quiz';
  const isScorePage = location.pathname === '/score';
  const isReviewPage = location.pathname === '/review';

  const hideNavbar = isQuizPage || isScorePage || isReviewPage;

  const handleStartClick = () => {
    if (!user) {
      alert('Please login to start the quiz!');
      return;
    }
    navigate('/quiz');
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="content-box">
        {!hideNavbar && (
          <div className="auth-buttons">
            <button className="text-btn" onClick={() => navigate('/')}>Home</button>
            {!user && (
              <>
                <button className="text-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="text-btn" onClick={() => navigate('/signup')}>Sign Up</button>
              </>
            )}
            {user && (
              <button className="text-btn" onClick={handleLogout}>Logout</button>
            )}
          </div>
        )}

        {isHomePage && (
          <>
            <img src={smiley} alt="Smiley" className="smiley" />
            <img src={pencil} alt="Pencil Mascot" className="pencil" />
            <div className="start-container">
              <button className="start-btn" onClick={handleStartClick}>
                <img src={arrow} alt="Start" />
              </button>
            </div>
          </>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
