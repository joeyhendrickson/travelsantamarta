import React, { useState } from 'react';
import ChatBox from './components/ChatBox';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🌴 Travel Santa Marta</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#report" className="nav-link">Report Issue</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#login" className="nav-link">Login</a>
            <a href="#cart" className="nav-link cart-link">🛒 Cart</a>
          </nav>

          {/* Mobile Hamburger Menu */}
          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation Sidebar */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <h3>Menu</h3>
            <button className="close-menu" onClick={toggleMenu}>×</button>
          </div>
          <nav className="mobile-nav-links">
            <a href="#report" className="mobile-nav-link" onClick={toggleMenu}>Report Issue</a>
            <a href="#how-it-works" className="mobile-nav-link" onClick={toggleMenu}>How It Works</a>
            <a href="#login" className="mobile-nav-link" onClick={toggleMenu}>Login</a>
            <a href="#cart" className="mobile-nav-link" onClick={toggleMenu}>🛒 Cart</a>
          </nav>
        </div>

        <p className="header-subtitle">Your AI travel assistant for the perfect Colombian adventure</p>
      </header>

      <main className="app-main">
        <ChatBox />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>Powered by AI • Plan your dream trip to Santa Marta, Colombia</p>
          <div className="footer-icon">🌴</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
