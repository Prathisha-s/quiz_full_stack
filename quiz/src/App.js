import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Quiz from './pages/Quiz';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Review from './pages/Review';
import Score from './pages/Score';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />         {/* This shows Home on load */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="score" element={<Score />} />  
          <Route path="review" element={<Review />} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
