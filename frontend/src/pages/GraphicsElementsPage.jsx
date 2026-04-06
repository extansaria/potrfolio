import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Layers,
  Send,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { toAssetUrl } from "../utils/assetPath";

const photos = [
  "/case1/ember.png",
  "/case2/cargo.jpg",
  "/case3/candle.jpg",
  "/case4/miks5.jpg",
  "/case5/wa1.jpg",
  "/case5/wa2.jpg",
  "/case5/wa3.jpg",
  "/case5/wa4.jpg",
  "/case5/wa5.jpg",
  "/case-images/aurora.svg",
  "/case-images/bloom.svg",
  "/case-images/drift.svg",
  "/case-images/oasis.svg"
];

const icons = [
  Calendar,
  Clock,
  MapPin,
  User,
  Layers,
  Send,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  ArrowRight
];

const GraphicsElementsPage = () => {
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

        <h1 className="text-3xl md:text-5xl font-bold mb-8">ГРАФИЧЕСКИЕ ЭЛЕМЕНТЫ</h1>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 mb-4">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">ФОТО</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-black/20 overflow-hidden aspect-[4/3]"
              >
                <img
                  src={toAssetUrl(item)}
                  alt="Графический элемент"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
          <h2 className="text-sm font-mono text-cyan-400 mb-4">ИКОНКИ</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {icons.map((Icon, idx) => (
              <div
                key={idx}
                className="h-14 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center text-cyan-400"
              >
                <Icon size={22} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GraphicsElementsPage;
