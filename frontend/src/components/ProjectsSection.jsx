import React from 'react';
import { Link } from 'react-router-dom';
import { projectCases } from '../pages/projects/projectCases';

const ProjectCard = ({ project }) => (
  <Link
    to={`/projects/${project.slug}`}
    className="group h-[30rem] rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/40 transition-all duration-300 p-6 flex flex-col justify-between"
  >
    <div>
      {project.coverImage ? (
        <div className="h-72 w-full rounded-xl overflow-hidden mb-5">
          <img
            src={project.coverImage}
            alt={`${project.title} - превью`}
            className={`h-full w-full ${
              project.coverFit === 'contain' ? 'object-contain bg-[#060a13]' : 'object-cover'
            } ${project.coverZoom ? 'scale-110' : ''}`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-72 rounded-xl border border-dashed border-white/20 bg-black/20 flex items-center justify-center mb-5">
          <span className="text-gray-500 text-xs font-mono">Превью проекта (заглушка)</span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm">{project.shortDescription}</p>
    </div>

    <span className="text-cyan-400 text-sm font-medium mt-5 inline-flex items-center gap-2">
      Смотреть кейс
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </span>
  </Link>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-mono mb-4 block">{''}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Мои работы</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Раздел в обновлении</p>
        </div>

        {/* Сетка работ */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projectCases.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;