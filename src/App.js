import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';	
import 'bootstrap/dist/js/bootstrap.min.js';

import './style/general.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import Gym from './components/pages/gym/Gym';

function App() {

  return (
    <main className="App">
      <Router>
        <><Header /></>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/gyms/:id" element={<Gym />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
