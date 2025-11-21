import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TarotDeck } from './components/TarotDeck';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="bg-cyber-950 min-h-screen text-white selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
      <Header />
      <main>
        <Hero />
        <About />
        <TarotDeck />
        <Contact />
      </main>
    </div>
  );
}

export default App;