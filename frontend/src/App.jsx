import React from 'react';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🌴 Travel Santa Marta</h1>
        <p>Your AI travel assistant for the perfect Colombian adventure</p>
      </header>
      <main className="app-main">
        <ChatBox />
      </main>
      <footer className="app-footer">
        <p>Powered by AI • Plan your dream trip to Santa Marta, Colombia</p>
      </footer>
    </div>
  );
}

export default App;
