import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

const buttonTypes = [
  {
    title: "Primary Gradient / Rounded Full",
    note: "Главные CTA на первом экране.",
    normal:
      "px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full transition-all duration-300",
    hover:
      "px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25",
    active:
      "px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 translate-y-px scale-[0.99]"
  },
  {
    title: "Primary Gradient / Rounded XL",
    note: "Формы (контакты, события, логин в админку).",
    normal:
      "px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl transition-all duration-300",
    hover:
      "px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25",
    active:
      "px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 translate-y-px scale-[0.99]"
  },
  {
    title: "Solid Cyan / Rounded Full",
    note: "Кнопки в шапке и мобильном меню.",
    normal:
      "px-5 py-2.5 bg-cyan-500 text-black font-medium rounded-full transition-all duration-300",
    hover:
      "px-5 py-2.5 bg-cyan-400 text-black font-medium rounded-full shadow-lg shadow-cyan-500/25",
    active:
      "px-5 py-2.5 bg-cyan-400 text-black font-medium rounded-full shadow-lg shadow-cyan-500/25 translate-y-px scale-[0.99]"
  },
  {
    title: "Solid Cyan / Rounded XL",
    note: "CTA на странице кейсов.",
    normal: "px-5 py-3 bg-cyan-500 text-black font-semibold rounded-xl transition-colors",
    hover: "px-5 py-3 bg-cyan-400 text-black font-semibold rounded-xl",
    active: "px-5 py-3 bg-cyan-400 text-black font-semibold rounded-xl translate-y-px scale-[0.99]"
  },
  {
    title: "Ghost / Rounded Full",
    note: "Вторичные CTA на Hero-блоке.",
    normal:
      "px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full transition-all duration-300",
    hover:
      "px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full",
    active:
      "px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full translate-y-px scale-[0.99]"
  },
  {
    title: "Ghost / Rounded XL",
    note: "Навигация по кейсам, кнопки 'назад/вперёд'.",
    normal:
      "px-5 py-3 bg-white/5 border border-white/10 text-gray-200 rounded-xl transition-all",
    hover:
      "px-5 py-3 bg-white/5 border border-cyan-500/40 text-white rounded-xl transition-all",
    active:
      "px-5 py-3 bg-white/10 border border-cyan-500/40 text-white rounded-xl transition-all translate-y-px scale-[0.99]"
  },
  {
    title: "Icon Ghost",
    note: "Соцсети (Footer/Hero).",
    normal:
      "p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 inline-flex items-center justify-center",
    hover:
      "p-3 rounded-xl bg-white/10 border border-cyan-500/50 text-white transition-all duration-300 inline-flex items-center justify-center",
    active:
      "p-3 rounded-xl bg-white/10 border border-cyan-500/50 text-white transition-all duration-300 inline-flex items-center justify-center translate-y-px scale-[0.99]"
  },
  {
    title: "Text Link Button",
    note: "Текстовые кнопки-линки в шапке и футере.",
    inlineOnly: true,
    normal: "px-0 py-0 text-gray-400 text-sm transition-colors",
    hover: "px-0 py-0 text-cyan-400 text-sm transition-colors",
    active: "px-0 py-0 text-cyan-400 text-sm transition-colors underline underline-offset-4"
  },
  {
    title: "Pill Switch",
    note: "Переключение между кейсами.",
    normal: "px-4 py-2 rounded-full text-sm border bg-white/5 border-white/10 text-gray-300",
    hover: "px-4 py-2 rounded-full text-sm border bg-white/5 border-cyan-500/40 text-white",
    active: "px-4 py-2 rounded-full text-sm border bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
  }
];

const StatePreview = ({ classes, children, inlineOnly = false }) => (
  <button
    type="button"
    className={`${classes} text-xs ${
      inlineOnly ? "" : "min-w-[200px] min-h-[58px] inline-flex items-center justify-center"
    }`}
  >
    {children}
  </button>
);

const UIKitPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05030f] text-white font-sans">
      <div className="px-4 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Назад на главную
          </Link>

          <section className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">UI-кит кнопок</h1>
            <p className="text-gray-400 max-w-3xl">
              Ниже собраны все основные кнопки сайта с тремя состояниями: обычное, наведение и
              нажатие.
            </p>
          </section>

          <div className="space-y-4">
            {buttonTypes.map((item) => (
              <article
                key={item.title}
                className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-sm text-gray-400 mb-5">{item.note}</p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                    <p className="text-xs text-gray-500 mb-3">Обычное</p>
                    <StatePreview classes={item.normal} inlineOnly={item.inlineOnly}>
                      Кнопка
                    </StatePreview>
                  </div>
                  <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                    <p className="text-xs text-gray-500 mb-3">Наведение</p>
                    <StatePreview classes={item.hover} inlineOnly={item.inlineOnly}>
                      Кнопка
                    </StatePreview>
                  </div>
                  <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                    <p className="text-xs text-gray-500 mb-3">Нажатие</p>
                    <StatePreview classes={item.active} inlineOnly={item.inlineOnly}>
                      Кнопка
                    </StatePreview>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold mb-2">Подпись для курсовой</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Система кнопок построена на контрасте ярких primary CTA (градиент/циан) и спокойных
              ghost-вариантов. Во всех ключевых кнопках применены мягкие переходы по цвету и
              световой акцент в hover-состоянии, а состояние нажатия визуально фиксируется
              уменьшением масштаба и смещением по оси Y.
            </p>
            <div className="mt-4">
              <button
                type="button"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xs font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                Пример CTA
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIKitPage;
