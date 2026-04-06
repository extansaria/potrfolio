import React from 'react';
import { Linkedin, Send, Heart, Code, Settings } from 'lucide-react';
import { personalInfo, footerInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleAdminClick = () => {
    if (window.location.pathname === '/admin') {
      return;
    }
    window.location.href = '/admin';
  };

  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Лого и описание */}
          <div>
            <div className="text-xl font-bold text-white mb-4">
              <span className="text-cyan-400">{'<'}</span>
              DS
              <span className="text-cyan-400">{'/>'}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Frontend-разработчик, создающий современные и отзывчивые веб-приложения.
            </p>
          </div>

          {/* Ссылки */}
          <div>
            <h4 className="text-white font-semibold mb-4">Быстрые ссылки</h4>
            <div className="flex flex-col gap-2">
              {['about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-500 hover:text-cyan-400 transition-colors text-sm text-left capitalize"
                >
                  {section === 'about' ? 'Обо мне' : 
                   section === 'experience' ? 'Опыт' :
                   section === 'skills' ? 'Навыки' :
                   section === 'projects' ? 'Проекты' : 'Контакты'}
                </button>
              ))}
            </div>
          </div>

          {/* Соцсети */}
          <div>
            <h4 className="text-white font-semibold mb-4">Социальные сети</h4>
            <div className="flex gap-3">
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={`https://t.me/${personalInfo.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Информация о задании */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-white/5 mb-8">
          <div className="grid gap-6">
            {/* JavaScript функционал */}
            <div>
              <span className="text-purple-400 text-xs font-mono block mb-1 flex items-center gap-1">
                <Code size={12} />
                Реализованный JavaScript функционал
              </span>
              <div className="flex flex-wrap gap-2">
                {footerInfo.jsFeatures.map((feature, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs text-gray-300 bg-white/5 rounded-full border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="text-center pt-8 border-t border-white/5 relative">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            © {currentYear} {personalInfo.name}. Сделано с 
            <Heart size={14} className="text-red-400" fill="currentColor" />
            в Санкт-Петербурге
          </p>

          <button
            onClick={() => {
              if (window.location.pathname === '/ui-kit') {
                return;
              }
              window.location.href = '/ui-kit';
            }}
            className="absolute bottom-2 left-0 px-2 py-1 text-[11px] text-gray-700 hover:text-gray-500 transition-colors opacity-20 hover:opacity-40"
            title="UI-кит кнопок"
          >
            ui-кит
          </button>

          <button
            onClick={() => {
              if (window.location.pathname === '/style-guide') {
                return;
              }
              window.location.href = '/style-guide';
            }}
            className="absolute bottom-2 left-14 px-2 py-1 text-[11px] text-gray-700 hover:text-gray-500 transition-colors opacity-20 hover:opacity-40"
            title="Style Guide"
          >
            style
          </button>

          <button
            onClick={() => {
              if (window.location.pathname === '/graphics-elements') {
                return;
              }
              window.location.href = '/graphics-elements';
            }}
            className="absolute bottom-2 left-28 px-2 py-1 text-[11px] text-gray-700 hover:text-gray-500 transition-colors opacity-20 hover:opacity-40"
            title="Графические элементы"
          >
            графика
          </button>

          <button
            onClick={() => {
              if (window.location.pathname === '/typography-guide') {
                return;
              }
              window.location.href = '/typography-guide';
            }}
            className="absolute bottom-2 left-[170px] px-2 py-1 text-[11px] text-gray-700 hover:text-gray-500 transition-colors opacity-20 hover:opacity-40"
            title="Шрифты"
          >
            шрифты
          </button>
          
          {/* Маленькая кнопка админки */}
          <button
            onClick={handleAdminClick}
            className="absolute bottom-2 right-0 p-2 text-gray-600 hover:text-gray-400 transition-colors opacity-30 hover:opacity-60"
            title="Админ-панель"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
