import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: '關於我', id: 'about' },
    { name: '靈魂指引', id: 'deck' },
    { name: '預約解牌', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-cyber-950/90 backdrop-blur-md border-cyber-cyan/20 py-2' : 'bg-transparent border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo('hero')}>
          <Cpu className="w-6 h-6 text-cyber-cyan group-hover:rotate-180 transition-transform duration-700" />
          <span className="font-bold text-lg font-mono text-white tracking-wider">靈魂解讀</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          {navLinks.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 text-sm font-medium text-cyber-slate hover:text-cyber-cyan hover:bg-white/5 transition-all rounded-md"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cyber-950 border-b border-cyber-cyan/20 p-4 flex flex-col space-y-2">
           {navLinks.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollTo(item.id)}
              className="text-left font-medium text-cyber-slate hover:text-cyber-cyan py-3 border-b border-white/5 last:border-0"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};