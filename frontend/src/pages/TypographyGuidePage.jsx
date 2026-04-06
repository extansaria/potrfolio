import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const headingScale = [
  { label: "H1 (Hero)", cls: "text-5xl md:text-7xl font-bold", note: "48/72 px, 700, line-height 1" },
  { label: "H2 (Секции)", cls: "text-4xl md:text-5xl font-bold", note: "36/48 px, 700, 40/48 px" },
  { label: "H3 (Блоки)", cls: "text-2xl md:text-3xl font-semibold", note: "24/30 px, 600, 32/36 px" }
];

const bodyScale = [
  { sample: "Основной текст", cls: "text-xl text-gray-300", note: "20 px, 400, 28 px" },
  { sample: "Обычный абзац", cls: "text-lg text-gray-300", note: "18 px, 400, 28 px" },
  { sample: "Подпись", cls: "text-base text-gray-400", note: "16 px, 400, 24 px" },
  { sample: "Служебная метка", cls: "text-sm font-mono text-cyan-400", note: "14 px, mono, 20 px" }
];

const TypographyGuidePage = () => {
  return (
    <div className="min-h-screen bg-[#05030f] text-white font-sans px-4 py-10 md:py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base text-gray-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Назад на главную
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold mb-8">ШРИФТОВОЕ ОФОРМЛЕНИЕ САЙТА</h1>

        <section className="mb-5">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-base font-mono text-cyan-400 mb-4">ОСНОВНАЯ ГАРНИТУРА</h2>
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="text-4xl font-bold mb-2">Inter</p>
              <p className="text-lg text-gray-300 mb-1">weights: 300 • 400 • 500 • 600 • 700 • 800</p>
              <p className="text-base text-gray-400">
                fallback: -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif
              </p>
            </div>
          </article>
        </section>

        <section className="grid lg:grid-cols-2 gap-5 mb-5">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-base font-mono text-cyan-400 mb-4">ЗАГОЛОВКИ</h2>
            <div className="space-y-5">
              {headingScale.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <div className={item.cls}>{item.label}</div>
                  <div className="mt-2 text-base text-gray-400">{item.note}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-base font-mono text-cyan-400 mb-4">ОСНОВНОЙ ТЕКСТ</h2>
            <div className="space-y-5">
              {bodyScale.map((item) => (
                <div key={item.sample} className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <div className={item.cls}>{item.sample}</div>
                  <div className="mt-2 text-base text-gray-400">{item.note}</div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-base font-mono text-cyan-400 mb-4">ИНТЕРЛИНЬЯЖ И ПРАВИЛА</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="text-base text-gray-300 mb-2">Heading scale</p>
              <p className="text-base text-gray-400">text-3xl → 36 px line-height</p>
              <p className="text-base text-gray-400">text-4xl → 40 px line-height</p>
              <p className="text-base text-gray-400">text-5xl / text-7xl → line-height 1</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="text-base text-gray-300 mb-2">Body scale</p>
              <p className="text-base text-gray-400">text-lg → 28 px</p>
              <p className="text-base text-gray-400">text-base → 24 px</p>
              <p className="text-base text-gray-400">text-sm / text-xs → 20 / 16 px</p>
              <p className="text-base text-gray-400">long copy: leading-relaxed (1.625)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TypographyGuidePage;
