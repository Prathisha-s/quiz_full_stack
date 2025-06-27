// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, get, ref } from 'firebase/database';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const db = getDatabase();
        const snap = await get(ref(db, 'usernames'));
        const map = snap.val();
        for (const uname in map) {
          if (map[uname].email === currentUser.email) {
            setUsername(uname);
            break;
          }
        }
      } else {
        setUsername('');
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, username }}>
      {children}
    </AuthContext.Provider>
  );
};
