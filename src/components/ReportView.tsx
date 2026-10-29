import React, { useEffect } from 'react';
import { QuestionData, UserAnswer } from '../types';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Volume2,
  Sparkles,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechManager } from '../utils/speech';

interface ReportViewProps {
  questions: QuestionData[];
  answers: Record<number, UserAnswer>;
  onRestartQuiz: () => void;
  onReviewQuestion: (index: number) => void;
  onBackToMenu: () => void;
  isIfpMode: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  questions,
  answers,
  onRestartQuiz,
  onReviewQuestion,
  onBackToMenu,
  isIfpMode,
}) => {
  const totalQuestions = questions.length;
  let totalScorePoints = 0;
  let correctCount = 0;
  let partialCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  // Breakdown by topic
  const topicStats: Record<string, { total: number; scoreSum: number; answered: number }> = {};
  // Breakdown by question type
  const typeStats: Record<string, { total: number; scoreSum: number; answered: number }> = {
    pilihan_ganda: { total: 0, scoreSum: 0, answered: 0 },
    pilihan_ganda_kompleks: { total: 0, scoreSum: 0, answered: 0 },
    benar_salah: { total: 0, scoreSum: 0, answered: 0 },
  };

  questions.forEach((q) => {
    // Topic aggregation
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, scoreSum: 0, answered: 0 };
    }
    topicStats[q.topic].total += 1;

    // Type aggregation
    if (typeStats[q.type]) {
      typeStats[q.type].total += 1;
    }

    const ans = answers[q.id];
    if (!ans || !ans.isSubmitted) {
      unansweredCount++;
    } else {
      totalScorePoints += ans.score;
      topicStats[q.topic].scoreSum += ans.score;
      topicStats[q.topic].answered += 1;

      if (typeStats[q.type]) {
        typeStats[q.type].scoreSum += ans.score;
        typeStats[q.type].answered += 1;
      }

      if (ans.score === 100) {
        correctCount++;
      } else if (ans.score > 0) {
        partialCount++;
      } else {
        wrongCount++;
      }
    }
  });

  const finalScorePercent = Math.round(totalScorePoints / totalQuestions);

  // Trigger celebration confetti if score is high
  useEffect(() => {
    if (finalScorePercent >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback if confetti isn't supported
      }
    }
  }, [finalScorePercent]);

  // Determine strengths & topics to improve
  const topicRankings = Object.entries(topicStats).map(([topic, data]) => {
    const avg = data.total > 0 ? Math.round(data.scoreSum / data.total) : 0;
    return { topic, avg, total: data.total, answered: data.answered };
  });

  topicRankings.sort((a, b) => b.avg - a.avg);

  const strengths = topicRankings.filter((t) => t.avg >= 70);
  const needsImprovement = topicRankings.filter((t) => t.avg < 70);

  // Personalized Mister Jo speech commentary
  const getNarrationFeedback = () => {
    if (finalScorePercent >= 85) {
      return `Luar biasa, Fisikawan Jenius! Skor akhirmu mencapai ${finalScorePercent} persen. Kamu telah menguasai penalaran alat optik dan cacat mata dengan sangat matang. Terus pertahankan ketajaman hitunganmu menuju ujian TKA!`;
    } else if (finalScorePercent >= 65) {
      return `Bagus sekali! Kamu meraih skor ${finalScorePercent} persen. Konsep dasar dan hitunganmu sudah cukup solid, namun ada beberapa topik yang perlu diperkuat terutama pada kondisi akomodasi dan teropong. Mari kita pelajari kembali pembahasannya!`;
    } else {
      return `Kerja keras yang bagus! Kamu telah menyelesaikan latihan dengan skor ${finalScorePercent} persen. Jangan berkecil hati; Fisika adalah seni melatih pola pikir. Perhatikan pembahasan langkah demi langkah pada topik yang masih keliru bersama Mister Jo!`;
    }
  };

  const handleSpeakReport = () => {
    speechManager.speak(getNarrationFeedback());
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24">
      {/* Score Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-slate-900 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
              <Trophy className="h-4 w-4" />
              <span>Laporan Hasil Belajar Mandiri</span>
            </span>
            <h1 className={`${isIfpMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-black tracking-tight`}>
              Hasil Evaluasi TKA Fisika: Alat Optik
            </h1>
            <p className="text-xs sm:text-sm text-red-100/80 max-w-xl">
              Analisis pencapaian penalaran numerik, pembiasan lensa, mikroskop, teropong, dan koreksi cacat mata.
            </p>

            <button
              onClick={handleSpeakReport}
              className="inline-flex items-center space-x-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 px-4 py-2 text-xs font-extrabold shadow transition active:scale-95 cursor-pointer"
            >
              <Volume2 className="h-4 w-4 fill-current" />
              <span>Dengarkan Evaluasi Mister Jo</span>
            </button>
          </div>

          {/* Big Score Ring */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-black/30 border border-white/20 backdrop-blur-md shadow-xl text-center min-w-[180px]">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
              Skor Total
            </span>
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight my-1">
              {finalScorePercent}%
            </span>
            <span className="text-xs text-red-200">
              {correctCount} Sempurna • {partialCount} Sebagian
            </span>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-xs">
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold mb-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Jawaban Benar (100%)</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-950">{correctCount}</span>
          <span className="text-xs text-emerald-700 block mt-0.5">Soal bernilai sempurna</span>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold mb-1">
            <Award className="h-4 w-4 text-amber-600" />
            <span>Benar Sebagian</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-950">{partialCount}</span>
          <span className="text-xs text-amber-700 block mt-0.5">Skor parsial PGK / BS</span>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4 shadow-xs">
          <div className="flex items-center space-x-2 text-red-800 text-xs font-bold mb-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>Belum Tepat (0%)</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-red-950">{wrongCount}</span>
          <span className="text-xs text-red-700 block mt-0.5">Perlu ditinjau ulang</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-700 text-xs font-bold mb-1">
            <AlertTriangle className="h-4 w-4 text-slate-500" />
            <span>Belum Dijawab</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">{unansweredCount}</span>
          <span className="text-xs text-slate-500 block mt-0.5">Dari 30 total soal</span>
        </div>
      </div>

      {/* Breakdown per Topic & Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance by Topic */}
        <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <span>Hasil Berdasarkan Topik Materi</span>
          </h2>
          <div className="space-y-3">
            {topicRankings.map((t) => (
              <div key={t.topic} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{t.topic}</span>
                  <span className={t.avg >= 70 ? 'text-emerald-600' : 'text-red-600'}>
                    {t.avg}% ({t.answered}/{t.total} Soal)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      t.avg >= 75 ? 'bg-emerald-500' : t.avg >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${t.avg}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance by Question Type */}
        <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-red-600" />
            <span>Hasil Berdasarkan Jenis Soal</span>
          </h2>
          <div className="space-y-4">
            {[
              { key: 'pilihan_ganda', label: 'Pilihan Ganda (10 Soal)' },
              { key: 'pilihan_ganda_kompleks', label: 'Pilihan Ganda Kompleks (10 Soal)' },
              { key: 'benar_salah', label: 'Benar / Salah (10 Soal)' },
            ].map(({ key, label }) => {
              const data = typeStats[key];
              const avg = data.total > 0 ? Math.round(data.scoreSum / data.total) : 0;
              return (
                <div key={key} className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>{label}</span>
                    <span className="text-red-600">{avg}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${avg}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Sudah dijawab: {data.answered} / {data.total}</span>
                    <span>Tingkat keberhasilan: {avg}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pedagogical Diagnosis & Recommendations */}
      <div className="rounded-3xl border border-red-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span>Diagnosis & Rekomendasi Belajar Ulang Mister Jo</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200 p-5 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Kekuatan Anda</span>
            </span>
            {strengths.length > 0 ? (
              <ul className="list-disc list-inside text-xs sm:text-sm text-emerald-950 space-y-1 font-medium">
                {strengths.map((s) => (
                  <li key={s.topic}>
                    <strong>{s.topic}</strong> (Rerata: {s.avg}%)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-600">
                Terus tingkatkan latihan di semua topik untuk membangun fondasi yang kokoh.
              </p>
            )}
          </div>

          {/* Needs Improvement & Recommended Order */}
          <div className="rounded-2xl bg-rose-50/60 border border-rose-200 p-5 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-800 flex items-center space-x-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              <span>Rekomendasi Urutan Belajar Ulang</span>
            </span>
            {needsImprovement.length > 0 ? (
              <ol className="list-decimal list-inside text-xs sm:text-sm text-rose-950 space-y-1 font-medium">
                {needsImprovement.map((item) => (
                  <li key={item.topic}>
                    Prioritas: <strong>{item.topic}</strong> (Rerata saat ini: {item.avg}%)
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-emerald-800 font-bold">
                Selamat! Semua topik telah Anda kuasai dengan nilai di atas 70%!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={onRestartQuiz}
          className="flex items-center space-x-2 rounded-2xl bg-white border border-red-300 hover:bg-red-50 text-red-700 px-6 py-3.5 font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>ULANGI LATIHAN</span>
        </button>

        <button
          onClick={() => onReviewQuestion(0)}
          className="flex items-center space-x-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
        >
          <BookOpen className="h-4 w-4" />
          <span>TINJAU SEMUA PEMBAHASAN</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          onClick={onBackToMenu}
          className="flex items-center space-x-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3.5 font-bold text-xs sm:text-sm transition cursor-pointer"
        >
          <span>KEMBALI KE MENU</span>
        </button>
      </div>
    </div>
  );
};
