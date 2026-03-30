import React from 'react';
import { Briefcase, Check } from 'lucide-react';
import { experience } from '../data/mock';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-mono mb-4 block">{''}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Где я работал</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const isRight = index % 2 === 0; // Карточка справа
              return (
                <div 
                  key={exp.id}
                  className="relative flex flex-col md:flex-row gap-8 items-start"
                >
                  {/* Точка на timeline */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#0a0a0f] transform -translate-x-1/2 z-10 shadow-lg shadow-cyan-500/50" />

                  {/* Мобильная версия - годы над карточкой */}
                  <div className="md:hidden ml-8 mb-2">
                    <div className="text-lg font-bold text-cyan-400">
                      {exp.period}
                    </div>
                  </div>

                  {/* Годы работы - слева для правых карточек */}
                  {isRight ? (
                    <div className="hidden md:flex flex-1 items-center justify-end pr-8">
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                          {exp.period.split(' - ')[0]}
                        </div>
                        <div className="text-lg text-gray-400">
                          <span className="text-gray-500">—</span> {exp.period.split(' - ')[1] || 'настоящее время'}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Контент карточки */}
                  <div className={`flex-1 ml-8 md:ml-0 ${
                    isRight ? 'md:pl-16' : 'md:pr-16'
                  }`}>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cyan-500/10">
                          <Briefcase size={20} className="text-cyan-400" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                      <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                      {/* Достижения */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <Check size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Годы работы - справа для левых карточек */}
                  {!isRight ? (
                    <div className="hidden md:flex flex-1 items-center justify-start pl-8">
                      <div className="text-left">
                        <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                          {exp.period.split(' - ')[0]}
                        </div>
                        <div className="text-lg text-gray-400">
                          <span className="text-gray-500">—</span> {exp.period.split(' - ')[1] || 'настоящее время'}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
