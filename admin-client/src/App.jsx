import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import About from './components/About';
import Profile from './components/Profile';

export default function App() {
  return <div>
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/sign-up"} element={<SignUp />} />
        <Route path={"/sign-in"} element={<SignIn />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
    </Router>
  </div>
}
