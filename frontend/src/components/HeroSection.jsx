import React from 'react';
import { ArrowDown, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../data/mock';

const heroPitch =
  'Создаю современные интерфейсы, которые помогают бизнесу получать заявки и продажи.\nБеру проект от идеи до запуска: дизайн, адаптив, анимации и стабильный продакшен.';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Приветствие */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Открыт для предложений</span>
        </div>

        {/* Имя и титул */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">
          {personalInfo.name}
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-semibold mb-6 animate-fade-in-up animation-delay-100">
          {personalInfo.title}
        </p>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200 whitespace-pre-line">
          {heroPitch}
        </p>

        {/* Социальные ссылки */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-300">
          <a 
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
          >
            <Linkedin size={22} />
          </a>
          <a 
            href={`https://t.me/${personalInfo.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
          >
            <Send size={22} />
          </a>
        </div>

        {/* CTA кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
          >
            Связаться со мной
          </button>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Смотреть проекты
          </button>
        </div>
      </div>

      {/* Скролл индикатор */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-cyan-400 transition-colors animate-bounce"
      >
        <ArrowDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
