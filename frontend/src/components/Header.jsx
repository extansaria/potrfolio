import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'Обо мне' },
    { id: 'experience', label: 'Опыт' },
    { id: 'skills', label: 'Навыки' },
    { id: 'projects', label: 'Проекты' },
    { id: 'events', label: 'События' },
    { id: 'contact', label: 'Контакты' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Логотип */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
          >
            <span className="text-cyan-400">{'<'}</span>
            DS
            <span className="text-cyan-400">{'/>'}</span>
          </button>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA кнопка */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:inline-flex px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Связаться
          </button>

          {/* Мобильное меню кнопка */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-400 hover:text-white transition-colors py-3 text-left border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-4 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-full transition-all"
          >
            Связаться
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;