import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nlp from './components/Nlp'
import Cnn from './components/Cnn';

import Home from './components/Home';

function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nlp" element={<Nlp />} />
          <Route path="/cnn" element={<Cnn />} />
          <Route path="/cnnUpload" element={<cnnUpload />} />
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
