import React from 'react';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { personalInfo, education } from '../data/mock';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-mono mb-4 block">{''}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Кто я такой</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Левая колонка - Инфо */}
          <div className="space-y-8">
            {/* Аватар и краткая инфа */}
            <div className="flex items-start gap-6">
              <img 
                src="/images/portrait.jpg" 
                alt={personalInfo.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-500/30 shrink-0 shadow-lg shadow-cyan-500/20"
              />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h3>
                <p className="text-cyan-400 font-medium mb-3">{personalInfo.title}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin size={14} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Описание */}
            <p className="text-gray-400 leading-relaxed">
              {personalInfo.about}
            </p>

            {/* Контактная информация */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Mail size={18} className="text-cyan-400" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Email</span>
                  <span className="text-gray-300 text-sm">{personalInfo.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Phone size={18} className="text-cyan-400" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Телефон</span>
                  <span className="text-gray-300 text-sm">{personalInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - Образование */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="p-2 rounded-lg bg-purple-500/10">
                <Calendar size={18} className="text-purple-400" />
              </span>
              Образование
            </h3>

            <div className="space-y-4">
              {education.map((edu) => (
                <div 
                  key={edu.id}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {edu.institution}
                      </h4>
                      <p className="text-gray-500 text-sm">{edu.fullName}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-cyan-400 text-sm mb-2">
                    {edu.degree} • {edu.field}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;