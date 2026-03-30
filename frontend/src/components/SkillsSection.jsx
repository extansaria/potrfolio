import React from 'react';
import { Code, Wrench, Heart } from 'lucide-react';
import { skills } from '../data/mock';

const SkillBar = ({ name, level }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-gray-300 text-sm font-medium">{name}</span>
      <span className="text-cyan-400 text-xs font-mono">{level}%</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-mono mb-4 block">{''}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Что я умею</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Frontend навыки */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/10">
                <Code size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Frontend</h3>
            </div>
            <div className="space-y-4">
              {skills.frontend.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>

          {/* Инструменты */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Wrench size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Инструменты</h3>
            </div>
            <div className="space-y-4">
              {skills.tools.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-pink-500/10">
                <Heart size={24} className="text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.soft.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-gray-300 text-sm hover:border-pink-500/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Сноска с пояснением */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-xs text-gray-400">
              <span className="text-cyan-400">*</span> Проценты указаны относительно уровня{' '}
              <span className="text-cyan-400 font-semibold">senior</span>-разработчика
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;