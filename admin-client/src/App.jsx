import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Profile from './pages/Profile';
import Appbar from './components/Appbar';

export default function App() {
  return <div>
    <Router>
      <Appbar />
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
