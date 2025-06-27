import React, { useState } from 'react';
import { auth } from '../firebase';
import { getDatabase, ref, set, get } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './FormStyle.css';
import signupBg from '../assets/signup_bg.png';
import sideImg from '../assets/side_img.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const db = getDatabase();
      const usernameRef = ref(db, `usernames/${username}`);
      const snapshot = await get(usernameRef);

      if (snapshot.exists()) {
        alert('Username already taken. Please choose another one.');
        return;
      }

      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Store mapping in Realtime DB
      await set(usernameRef, {
        email,
        uid
      });

      alert('Signup successful!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${signupBg})` }}>
      <div className="auth-inner-box">
        <div className="form-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="image-box">
          <img src={sideImg} alt="Decorative" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
