import React, { useState } from 'react';
import { FORMULA_COLLECTION, FormulaItem } from '../data/formulas';
import { BookOpen, Search, Volume2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { speechManager } from '../utils/speech';

interface FormulaReferenceViewProps {
  onBackToQuiz: () => void;
  isIfpMode: boolean;
}

export const FormulaReferenceView: React.FC<FormulaReferenceViewProps> = ({
  onBackToQuiz,
  isIfpMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(FORMULA_COLLECTION.map((f) => f.category)))];

  const filteredFormulas = FORMULA_COLLECTION.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formulaDisplay.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleSpeakFormula = (item: FormulaItem) => {
    const textToSpeak = `Rumus ${item.title}. Bentuk persamaan: ${item.formulaDisplay}. Penjelasan: ${item.explanation}. Contoh: ${item.example.problem}. Perhitungannya: ${item.example.calculation}`;
    speechManager.speak(textToSpeak);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-700 via-red-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
              <BookOpen className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                RUMUS KUNCI & MATERI INTI
              </h1>
              <p className="text-xs sm:text-sm text-red-100/80">
                Kompilasi Teori Alat Optik & Cacat Mata Bersama Mister Jo
              </p>
            </div>
          </div>
          <button
            onClick={onBackToQuiz}
            className="rounded-2xl bg-white text-red-700 px-5 py-2.5 font-bold text-xs sm:text-sm shadow-md hover:bg-red-50 transition cursor-pointer"
          >
            Kembali ke Latihan Soal
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari rumus (misal: lup, mikroskop, teropong, miopi)..."
              className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-red-200/60 backdrop-blur-md focus:outline-hidden focus:ring-2 focus:ring-amber-300"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-900 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredFormulas.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-red-100 bg-white p-6 shadow-md space-y-4 hover:border-red-300 transition"
          >
            {/* Title & Speech Button */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="inline-block rounded-md bg-red-100 text-red-700 font-extrabold text-[10px] px-2 py-0.5 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h2 className={`${isIfpMode ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-black text-slate-900`}>
                  {item.title}
                </h2>
              </div>
              <button
                onClick={() => handleSpeakFormula(item)}
                title="Dengarkan Rumus & Penjelasannya"
                className="flex items-center space-x-1 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 text-xs font-bold transition cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span className="hidden sm:inline">Dengarkan</span>
              </button>
            </div>

            {/* Formula Display Box */}
            <div className="rounded-2xl bg-slate-900 p-4 font-mono text-center shadow-inner">
              <span className={`${isIfpMode ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-extrabold text-amber-300 tracking-wide`}>
                {item.formulaDisplay}
              </span>
            </div>

            {/* Condition & Context */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
              <p>
                <strong className="text-slate-900">Kondisi Penggunaan:</strong> {item.condition}
              </p>
              <p className="text-slate-600">{item.explanation}</p>
            </div>

            {/* Symbols Table */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Keterangan Simbol & Satuan:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {item.symbols.map((sym, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="font-mono font-bold text-red-700 mr-1">{sym.symbol}</span>= {sym.meaning}
                    <span className="text-slate-400 block text-[11px]">Satuan: {sym.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example with Different Numerical Values */}
            <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-4 space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-amber-900 block">Contoh Penerapan Angka Nyata:</span>
              <p className="text-slate-700"><strong>Soal:</strong> {item.example.problem}</p>
              <p className="text-slate-700 font-mono text-xs bg-white/80 p-2 rounded-lg border border-amber-100">
                <strong>Perhitungan:</strong> {item.example.calculation}
              </p>
              <p className="font-bold text-emerald-700"><strong>Hasil:</strong> {item.example.result}</p>
            </div>

            {/* Caution / Limitation */}
            <div className="flex items-start space-x-2 text-xs text-rose-800 bg-rose-50 p-3 rounded-xl border border-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <p>
                <strong>Perhatian Mister Jo:</strong> {item.caution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
