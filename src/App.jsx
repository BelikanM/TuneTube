// App.jsx (ou votre composant principal)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Library from './pages/Library';
import Upload from './pages/Upload';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '80px' }}> {/* Espace pour la navbar fixe */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Navbar />
    </Router>
  );
}

export default App;

