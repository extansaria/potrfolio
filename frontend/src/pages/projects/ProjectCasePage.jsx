import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Layers, User } from 'lucide-react';
import AnimatedBackground from '../../components/AnimatedBackground';
import { getProjectCaseBySlug, projectCases } from './projectCases';
import { toAssetUrl } from '../../utils/assetPath';

const ProjectCasePage = () => {
  const { slug } = useParams();
  const project = getProjectCaseBySlug(slug);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [siteMessage, setSiteMessage] = React.useState('');
  const currentIndex = projectCases.findIndex((item) => item.slug === slug);
  const prevProject = currentIndex > 0 ? projectCases[currentIndex - 1] : null;
  const nextProject = currentIndex < projectCases.length - 1 ? projectCases[currentIndex + 1] : null;
  const descriptionParts = (project?.description || '')
    .split('. ')
    .filter(Boolean)
    .map((part) => (part.endsWith('.') ? part : `${part}.`));
  const half = Math.ceil(descriptionParts.length / 2);
  const leftDescription = descriptionParts.slice(0, half).join(' ');
  const rightDescription = descriptionParts.slice(half).join(' ');

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [slug]);

  React.useEffect(() => {
    setSiteMessage('');
  }, [slug]);

  const handleOpenProjectSite = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (project.missingHost) {
      setSiteMessage('У данного сайта отсутствует хост');
    }
  };

  if (!project) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#05030f] text-white font-sans">
        <AnimatedBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-xl w-full p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
            <p className="text-cyan-400 text-sm font-mono mb-3">404</p>
            <h1 className="text-3xl font-bold mb-3">Кейс не найден</h1>
            <p className="text-gray-400 mb-6">Такого проекта пока нет или ссылка устарела.</p>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors"
            >
              <ArrowLeft size={16} />
              Вернуться к работам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05030f] text-white font-sans">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Назад к работам
            </Link>
            <span className="text-cyan-400 text-xs font-mono">PROJECT CASE</span>
          </div>
        </header>

        <main className="px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <section className="mb-8">
              <p className="text-xs text-gray-500 mb-3">Переключение между кейсами</p>
              <div className="flex flex-wrap gap-2">
                {projectCases.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/projects/${item.slug}`}
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${
                      item.slug === project.slug
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/40'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-10 md:mb-14">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-gray-400 max-w-3xl">{project.shortDescription}</p>
              {(project.liveUrl || project.showSiteButton) && (
                <button
                  type="button"
                  onClick={handleOpenProjectSite}
                  className="inline-flex mt-5 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors"
                >
                  Открыть сайт проекта
                </button>
              )}
              {siteMessage && <p className="mt-3 text-sm text-red-300">{siteMessage}</p>}
            </section>

            <section className="grid md:grid-cols-3 gap-4 mb-10 md:mb-14">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <User size={14} />
                  Роль
                </p>
                <p className="text-white font-medium">{project.role}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <Calendar size={14} />
                  Период
                </p>
                <p className="text-white font-medium">{project.period}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <Layers size={14} />
                  Технологии
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Описание проекта</h2>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 grid md:grid-cols-2 gap-6">
                <p className="text-gray-300 leading-relaxed">{leftDescription || project.description}</p>
                <p className="text-gray-300 leading-relaxed">{rightDescription || ''}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Галерея</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.images.map((imageItem, index) => (
                  typeof imageItem === 'string' &&
                  (imageItem.startsWith('http') || imageItem.startsWith('/')) ? (
                    <img
                      key={`${project.slug}-${index}`}
                      src={toAssetUrl(imageItem)}
                      alt={`${project.title} - экран ${index + 1}`}
                      className={
                        project.uniformGallery
                          ? 'w-full aspect-[4/3] object-cover rounded-2xl cursor-zoom-in border border-white/10'
                          : 'w-full h-auto rounded-2xl cursor-zoom-in'
                      }
                      loading="lazy"
                      onClick={() => setSelectedImage(toAssetUrl(imageItem))}
                    />
                  ) : (
                    <div
                      key={`${project.slug}-${index}`}
                      className="h-64 rounded-2xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center"
                    >
                      <span className="text-gray-400 text-sm font-mono">{imageItem} (заглушка)</span>
                    </div>
                  )
                ))}
              </div>
            </section>

            <section className="mt-10 md:mt-14 pt-8 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-4">Другие кейсы на этой странице</p>
              <div className="flex flex-wrap gap-3">
                {prevProject && (
                  <Link
                    to={`/projects/${prevProject.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-gray-200 hover:text-white transition-all"
                  >
                    <ArrowLeft size={16} />
                    Предыдущий: {prevProject.title}
                  </Link>
                )}
                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-gray-200 hover:text-white transition-all"
                  >
                    Следующий: {nextProject.title}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={toAssetUrl(selectedImage)}
            alt="Увеличенное изображение кейса"
            className="max-w-full max-h-full rounded-2xl cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCasePage;
