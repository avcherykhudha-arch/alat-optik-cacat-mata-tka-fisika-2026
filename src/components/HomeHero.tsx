import React from 'react';
import {
  Compass,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Play,
  RotateCcw,
  Settings,
  BarChart3,
  Award,
  ArrowRight,
  Eye,
  Layers,
  Volume2,
} from 'lucide-react';
import { speechManager } from '../utils/speech';

interface HomeHeroProps {
  onStartQuiz: () => void;
  onOpenFormulas: () => void;
  onOpenReport: () => void;
  onOpenVoiceSettings: () => void;
  onOpenResetModal: () => void;
  completedCount: number;
  totalQuestions: number;
  averageScore: number;
  isIfpMode: boolean;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartQuiz,
  onOpenFormulas,
  onOpenReport,
  onOpenVoiceSettings,
  onOpenResetModal,
  completedCount,
  totalQuestions,
  averageScore,
  isIfpMode,
}) => {
  const introNarration =
    'Halo, Fisikawan Muda! Selamat datang di Fisika Jenius bersama Mister Jo. Di sini, kamu tidak hanya menghafal rumus alat optik, tetapi belajar memahami cara kerja lup, mikroskop, berbagai jenis teropong, serta cara menghitung cacat mata. Kamu akan berlatih membaca stimulus, menganalisis data, memilih rumus yang tepat, dan menyelesaikan soal numerik dari tingkat dasar sampai penalaran tingkat tinggi. Setiap soal memiliki pembahasan lengkap, cara cepat, rumus kunci, dan panduan suara. Yuk, kita latih kemampuan berpikir Fisikamu!';

  const handlePlayIntro = () => {
    speechManager.speak(introNarration);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-slate-900 text-white shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Subtle optical ray background effect */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-red-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/20">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Aplikasi Pembelajaran Mandiri & IFP</span>
            </div>

            <div className="space-y-2">
              <h1 className={`${isIfpMode ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl'} font-black tracking-tight leading-tight`}>
                FISIKA <span className="text-amber-300">JENIUS</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-red-100 mt-1">
                  Laboratorium Alat Optik
                </span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-red-100/90 italic">
                “Pahami Konsepnya, Kuasai Hitungannya, Taklukkan TKA Bersama Mister Jo!”
              </p>
            </div>

            <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 max-w-xl">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-400 to-red-500 flex items-center justify-center font-black text-xl text-slate-900 shadow-md">
                JO
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-white text-sm sm:text-base">Mister Jo</span>
                  <span className="rounded-md bg-red-500/40 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                    Guru Fisika
                  </span>
                </div>
                <p className="text-xs text-red-100/80 leading-snug">
                  Pembimbing interaktif dengan panduan suara Web Speech API dan penalaran bertahap HOTS.
                </p>
              </div>
              <button
                onClick={handlePlayIntro}
                title="Dengarkan Suara Pengantar Mister Jo"
                className="flex items-center space-x-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 px-3 py-2 text-xs font-bold shadow transition cursor-pointer active:scale-95"
              >
                <Volume2 className="h-4 w-4 fill-current" />
                <span className="hidden sm:inline">Dengar Sapaan</span>
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onStartQuiz}
                className="flex items-center space-x-2 rounded-2xl bg-white text-red-700 hover:bg-red-50 px-6 py-3.5 font-extrabold text-sm sm:text-base shadow-xl transition active:scale-95 cursor-pointer"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>MULAI BELAJAR</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenFormulas}
                className="flex items-center space-x-2 rounded-2xl bg-red-950/60 hover:bg-red-950/80 text-white border border-red-400/30 px-5 py-3.5 font-bold text-sm sm:text-base backdrop-blur-xs transition cursor-pointer"
              >
                <BookOpen className="h-5 w-5 text-amber-300" />
                <span>MATERI INTI</span>
              </button>

              <button
                onClick={onOpenReport}
                className="flex items-center space-x-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 font-bold text-sm sm:text-base backdrop-blur-xs transition cursor-pointer"
              >
                <BarChart3 className="h-5 w-5 text-emerald-300" />
                <span>PROGRES BELAJAR</span>
              </button>
            </div>
          </div>

          {/* Interactive Optical Illustration Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-slate-900/80 p-5 backdrop-blur-md shadow-2xl text-left space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center space-x-1.5">
                  <Compass className="h-4 w-4" />
                  <span>Laboratorium Virtual Optik</span>
                </span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-bold">
                  30 Soal HOTS
                </span>
              </div>

              {/* Graphical illustration schematic of 4 instruments */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60 space-y-1">
                  <div className="flex items-center space-x-1.5 text-red-400 font-bold">
                    <Eye className="h-4 w-4" />
                    <span>Lup & Mata</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">4 Soal Lup + 8 Soal Cacat Mata (Miopi, Hipermetropi, Presbiopi).</p>
                </div>

                <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60 space-y-1">
                  <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
                    <Layers className="h-4 w-4" />
                    <span>Mikroskop</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">5 Soal: 2 lensa konvergen, perbesaran bertingkat, tabung d.</p>
                </div>

                <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60 space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                    <Compass className="h-4 w-4" />
                    <span>Teropong Bintang</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">4 Soal: Kepler refraktor astronomi, berkas paralel, akomodasi.</p>
                </div>

                <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60 space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                    <Sparkles className="h-4 w-4" />
                    <span>Panggung & Bumi</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">6 Soal: Teropong Galilei ringkas & teropong bumi 4fp.</p>
                </div>
              </div>

              {/* Progress Summary widget */}
              <div className="rounded-xl bg-black/40 p-3.5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Status Pengerjaan Latihan</span>
                  <span className="font-extrabold text-amber-300">
                    {completedCount} dari {totalQuestions} Soal Selesai
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-500 rounded-full"
                    style={{ width: `${(completedCount / totalQuestions) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Rerata Skor: {Math.round(averageScore)}%</span>
                  <span>{Math.round((completedCount / totalQuestions) * 100)}% Tuntas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Shortcut Buttons Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <button
          onClick={onStartQuiz}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-lg transition group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
            <Play className="h-6 w-6 fill-current" />
          </div>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-center">MULAI BELAJAR</span>
          <span className="text-[11px] text-slate-500 text-center">Latihan Berurutan</span>
        </button>

        <button
          onClick={onOpenFormulas}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-lg transition group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-center">MATERI INTI</span>
          <span className="text-[11px] text-slate-500 text-center">Rumus & Penurunan</span>
        </button>

        <button
          onClick={onStartQuiz}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-lg transition group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
            <Layers className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-center">LATIHAN 30 SOAL</span>
          <span className="text-[11px] text-slate-500 text-center">10 PG, 10 PGK, 10 BS</span>
        </button>

        <button
          onClick={onOpenReport}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-lg transition group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
            <BarChart3 className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-center">PROGRES BELAJAR</span>
          <span className="text-[11px] text-slate-500 text-center">Analisis Kekuatan</span>
        </button>

        <button
          onClick={onOpenVoiceSettings}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-lg transition group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
            <Settings className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-center">PENGATURAN SUARA</span>
          <span className="text-[11px] text-slate-500 text-center">Web Speech API</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-lg transition group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
            <RotateCcw className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-center">RESET PROGRES</span>
          <span className="text-[11px] text-slate-500 text-center">Mulai Ulang Latihan</span>
        </button>
      </section>

      {/* Curriculum & Pedagogy Highlights */}
      <section className="rounded-3xl bg-white border border-red-100 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center space-x-2">
          <Award className="h-6 w-6 text-red-600" />
          <span>Keunggulan Pembelajaran Bersama Mister Jo</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-red-50/50 border border-red-100 p-5 space-y-2">
            <div className="inline-block rounded-lg bg-red-600 text-white px-2.5 py-1 text-xs font-bold">
              Tahap A - H
            </div>
            <h3 className="font-bold text-slate-900 text-base">Alur Pembimbing Berurutan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mulai dari memahami stimulus, analisis besaran, menjawab mandiri, evaluasi transparan, pembahasan langkah runtut, trik cara cepat, rumus kunci, hingga refleksi konsep mini.
            </p>
          </div>

          <div className="rounded-2xl bg-red-50/50 border border-red-100 p-5 space-y-2">
            <div className="inline-block rounded-lg bg-slate-900 text-white px-2.5 py-1 text-xs font-bold">
              Standar TKA & HOTS
            </div>
            <h3 className="font-bold text-slate-900 text-base">100% Numerik & Stimulus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tidak ada soal hafalan kosong. Seluruh soal memuat perhitungan nyata, tabel spesifikasi, grafik korelasi, diagram pembiasan sinar, dan komparasi instrumen optik.
            </p>
          </div>

          <div className="rounded-2xl bg-red-50/50 border border-red-100 p-5 space-y-2">
            <div className="inline-block rounded-lg bg-amber-500 text-slate-900 px-2.5 py-1 text-xs font-bold">
              IFP & Offline Ready
            </div>
            <h3 className="font-bold text-slate-900 text-base">Nyaman di Layar Besar & Tanpa Internet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dilengkapi Mode IFP dengan tipografi besar (26–32px) agar terbaca jelas dari jarak beberapa meter di ruang kelas. Semua diagram berupa SVG lokal mandiri.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
