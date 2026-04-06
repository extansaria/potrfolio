import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Linkedin,
  Calendar,
  MapPin,
  Clock,
  User,
  Layers,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const palette = [
  "bg-[#05030f]",
  "bg-[#0a0a0f]",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-white/10",
  "bg-green-500/30",
  "bg-red-500/30"
];

const StyleGuidePage = () => {
  return (
    <div className="min-h-screen bg-[#05030f] text-white font-sans px-4 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Назад на главную
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold mb-8">СТАЙЛГАЙД</h1>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 mb-4">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">ТИПОГРАФИКА</h2>
          <div className="space-y-3">
            <div className="text-4xl md:text-6xl font-bold">Inter Жирный</div>
            <div className="text-2xl md:text-3xl font-semibold">Inter Полужирный</div>
            <div className="text-lg text-gray-300">
              Съешь же еще этих мягких французских булок 1234567890
            </div>
            <div className="text-sm text-gray-400">
              Съешь же еще этих мягких французских булок 1234567890
            </div>
            <div className="text-xs font-mono text-cyan-400">JetBrains Mono ЦИФРЫ 0123456789</div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 mb-4">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">ЦВЕТА</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {palette.map((item) => (
              <div key={item} className="space-y-1">
                <div className={`h-14 rounded-lg border border-white/10 ${item}`} />
                <div className="text-[10px] text-gray-500 truncate">{item}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 mb-4">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">КНОПКИ</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 flex flex-wrap items-start gap-3">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold rounded-full min-w-[190px] min-h-[56px]">
                Кнопка
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white text-xs font-semibold rounded-full min-w-[190px] min-h-[56px] shadow-lg shadow-cyan-500/25">
                Кнопка
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white text-xs font-semibold rounded-full min-w-[190px] min-h-[56px] translate-y-px scale-[0.99]">
                Кнопка
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 flex flex-wrap items-start gap-3">
              <button className="px-6 py-3 bg-white/5 border border-white/10 text-white text-xs rounded-xl min-w-[190px] min-h-[56px]">
                Кнопка
              </button>
              <button className="px-6 py-3 bg-white/10 border border-cyan-500/40 text-white text-xs rounded-xl min-w-[190px] min-h-[56px]">
                Кнопка
              </button>
              <button className="px-6 py-3 bg-white/10 border border-cyan-500/40 text-white text-xs rounded-xl min-w-[190px] min-h-[56px] translate-y-px scale-[0.99]">
                Кнопка
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 flex flex-wrap items-start gap-3">
              <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-gray-400 inline-flex items-center justify-center shrink-0">
                <Linkedin size={18} />
              </button>
              <button className="w-11 h-11 rounded-xl bg-white/10 border border-cyan-500/50 text-white inline-flex items-center justify-center shrink-0">
                <Send size={18} />
              </button>
              <button className="px-4 py-2 h-11 rounded-full text-xs border bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shrink-0">
                Переключатель
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 mb-4">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">ПОЛЯ ВВОДА</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
              placeholder="Текстовое поле"
              readOnly
            />
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500 ring-2 ring-cyan-500/20 text-white"
              placeholder="Фокус"
              readOnly
            />
            <textarea
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 resize-none"
              rows={1}
              placeholder="Многострочное поле"
              readOnly
            />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 mb-4">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">ИКОНКИ</h2>
          <div className="flex flex-wrap gap-3">
            {[Calendar, MapPin, Clock, User, Layers, CheckCircle2, AlertCircle].map((Icon, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">КАРТОЧКИ / ТЕГИ / СТАТУСЫ</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="h-20 rounded-xl bg-black/20 border border-dashed border-white/20 mb-3" />
              <div className="text-lg font-semibold">Карточка</div>
              <div className="text-sm text-gray-400">Текст</div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                  ТЕГ
                </span>
                <span className="px-3 py-1 text-xs text-gray-300 bg-white/5 rounded-full border border-white/10">
                  ЧИП
                </span>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                Успех
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                Ошибка
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs">
                БЕЙДЖ
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuidePage;
