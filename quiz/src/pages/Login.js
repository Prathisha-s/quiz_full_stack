// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { get, getDatabase, ref } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './FormStyle.css';
import loginBg from '../assets/login_bg.png';
import sideImg from '../assets/side_img.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const db = getDatabase();
      const snap = await get(ref(db, `usernames/${username}`));

      if (!snap.exists()) {
        alert('Username not found Please signup');
        return;
      }

      const { email } = snap.val();

      await signInWithEmailAndPassword(auth, email, password);

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="auth-inner-box">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="image-box">
          <img src={sideImg} alt="Decorative" />
        </div>
      </div>
    </div>
  );
};

export default Login;
