import React, { useState, useEffect } from 'react';
import {
  QuestionData,
  UserAnswer,
  UserSingleAnswer,
  UserComplexAnswer,
  UserTrueFalseAnswer,
} from '../types';
import { OpticsDiagram } from './OpticsDiagram';
import { speechManager } from '../utils/speech';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Zap,
  BookOpen,
  Award,
  Lightbulb,
  Sparkles,
  Check,
  RotateCcw,
} from 'lucide-react';

interface QuestionCardProps {
  question: QuestionData;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: UserAnswer;
  onSaveAnswer: (questionId: number, answer: UserAnswer) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onJumpToQuestion: (index: number) => void;
  answeredQuestions: Record<number, boolean>;
  isIfpMode: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  onSaveAnswer,
  onPrevQuestion,
  onNextQuestion,
  onJumpToQuestion,
  answeredQuestions,
  isIfpMode,
}) => {
  // Local interaction states
  const [singleChoice, setSingleChoice] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [complexChoices, setComplexChoices] = useState<('A' | 'B' | 'C' | 'D' | 'E')[]>([]);
  const [tfDecisions, setTfDecisions] = useState<Record<string, boolean | null>>({});

  // Active mentoring tab after submission: 'solution' | 'quickTrick' | 'formula' | 'reflection'
  const [activeTab, setActiveTab] = useState<'solution' | 'quickTrick' | 'formula' | 'reflection'>('solution');

  // Load existing answer if student already answered
  useEffect(() => {
    if (userAnswer) {
      if (userAnswer.type === 'pilihan_ganda') {
        setSingleChoice(userAnswer.selectedOption);
      } else if (userAnswer.type === 'pilihan_ganda_kompleks') {
        setComplexChoices(userAnswer.selectedOptions || []);
      } else if (userAnswer.type === 'benar_salah') {
        setTfDecisions(userAnswer.decisions || {});
      }
    } else {
      setSingleChoice(null);
      setComplexChoices([]);
      setTfDecisions({});
    }
  }, [userAnswer, question.id]);

  const isSubmitted = Boolean(userAnswer?.isSubmitted);

  // Read question narration
  const handleReadQuestion = () => {
    speechManager.speak(question.narration.stimulusAndQuestion);
  };

  const handleReadSolution = () => {
    speechManager.speak(question.narration.solutionSpeech);
  };

  const handleReadQuickTrick = () => {
    speechManager.speak(question.narration.quickTrickSpeech);
  };

  const handleReadFormula = () => {
    speechManager.speak(question.narration.formulaSpeech);
  };

  // Submission handler
  const handleSubmitAnswer = () => {
    if (question.type === 'pilihan_ganda') {
      if (!singleChoice) return;
      const isCorrect = singleChoice === question.correctSingleAnswer;
      const score = isCorrect ? 100 : 0;
      const answer: UserSingleAnswer = {
        type: 'pilihan_ganda',
        selectedOption: singleChoice,
        score,
        isSubmitted: true,
      };
      onSaveAnswer(question.id, answer);

      if (isCorrect) {
        speechManager.speak(question.narration.correctFeedback);
      } else {
        speechManager.speak(question.narration.incorrectFeedback);
      }
    } else if (question.type === 'pilihan_ganda_kompleks') {
      if (complexChoices.length === 0) return;
      const correctKeys = question.correctComplexAnswers || [];
      const totalOptions = question.options?.length || 5;

      let matchedItems = 0;
      ['A', 'B', 'C', 'D', 'E'].forEach((key) => {
        const optionKey = key as 'A' | 'B' | 'C' | 'D' | 'E';
        const shouldBeSelected = correctKeys.includes(optionKey);
        const isSelectedByUser = complexChoices.includes(optionKey);
        if (shouldBeSelected === isSelectedByUser) {
          matchedItems++;
        }
      });

      // Partial score formula (out of 100)
      const score = Math.round((matchedItems / totalOptions) * 100);
      const answer: UserComplexAnswer = {
        type: 'pilihan_ganda_kompleks',
        selectedOptions: complexChoices,
        score,
        isSubmitted: true,
      };
      onSaveAnswer(question.id, answer);

      if (score === 100) {
        speechManager.speak(question.narration.correctFeedback);
      } else {
        speechManager.speak(question.narration.incorrectFeedback);
      }
    } else if (question.type === 'benar_salah') {
      const statements = question.statements || [];
      const allChosen = statements.every((s) => tfDecisions[s.id] !== undefined && tfDecisions[s.id] !== null);
      if (!allChosen) return;

      let correctCount = 0;
      statements.forEach((s) => {
        if (tfDecisions[s.id] === s.isCorrect) {
          correctCount++;
        }
      });

      const score = Math.round((correctCount / statements.length) * 100);
      const answer: UserTrueFalseAnswer = {
        type: 'benar_salah',
        decisions: tfDecisions,
        score,
        isSubmitted: true,
      };
      onSaveAnswer(question.id, answer);

      if (score === 100) {
        speechManager.speak(question.narration.correctFeedback);
      } else {
        speechManager.speak(question.narration.incorrectFeedback);
      }
    }
  };

  const handleToggleComplexChoice = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isSubmitted) return;
    if (complexChoices.includes(key)) {
      setComplexChoices(complexChoices.filter((k) => k !== key));
    } else {
      setComplexChoices([...complexChoices, key]);
    }
  };

  const handleSelectTrueFalse = (statementId: string, value: boolean) => {
    if (isSubmitted) return;
    setTfDecisions({ ...tfDecisions, [statementId]: value });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Top Question Header & Number Grid Bar */}
      <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 font-black text-white text-base shadow-sm">
              {question.number}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-sm md:text-base">{question.topic}</span>
                <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-xs font-semibold">
                  {question.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Tipe:{' '}
                {question.type === 'pilihan_ganda'
                  ? 'Pilihan Ganda (Tunggal)'
                  : question.type === 'pilihan_ganda_kompleks'
                  ? 'Pilihan Ganda Kompleks (Banyak Jawaban)'
                  : 'Benar / Salah (3 Pernyataan)'}{' '}
                • Tingkat:{' '}
                <span
                  className={`font-bold ${
                    question.difficulty === 'Fondasi'
                      ? 'text-emerald-600'
                      : question.difficulty === 'Menengah'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {question.difficulty}
                </span>
              </p>
            </div>
          </div>

          {/* Audio & Status Badges */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReadQuestion}
              className="flex items-center space-x-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 text-xs font-bold transition cursor-pointer"
            >
              <Volume2 className="h-4 w-4" />
              <span>BACA SOAL</span>
            </button>
            {isSubmitted && (
              <span
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold flex items-center space-x-1 ${
                  userAnswer?.score === 100
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : userAnswer?.score && userAnswer.score > 0
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {userAnswer?.score === 100 ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <span>Skor: {userAnswer?.score ?? 0}%</span>
              </span>
            )}
          </div>
        </div>

        {/* 30-Question Quick Jump Navigation Dots */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span>Daftar Nomor Soal (1 - 30):</span>
            <span>
              {Object.keys(answeredQuestions).length} dari {totalQuestions} Soal Terjawab
            </span>
          </div>
          <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-30 gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const qNum = i + 1;
              const isCurrent = i === questionIndex;
              const isAnswered = Boolean(answeredQuestions[qNum]);
              return (
                <button
                  key={qNum}
                  onClick={() => onJumpToQuestion(i)}
                  className={`h-8 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    isCurrent
                      ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400 ring-offset-1'
                      : isAnswered
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {qNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Question Card with Mentoring Flow */}
      <div className="rounded-3xl border border-red-100 bg-white p-5 sm:p-8 shadow-md space-y-6">
        {/* TAHAP A: MEMAHAMI STIMULUS */}
        <section className="space-y-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-red-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                A
              </span>
              <span>Tahap A — Memahami Stimulus</span>
            </span>
            <span className="text-xs font-bold text-slate-600">{question.stimulus.title}</span>
          </div>

          <p className={`${isIfpMode ? 'text-xl sm:text-2xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'} font-normal text-slate-800`}>
            {question.stimulus.text}
          </p>

          {/* Render Optical Ray Diagram if provided */}
          {question.stimulus.diagramType && (
            <div className="pt-2">
              <OpticsDiagram type={question.stimulus.diagramType} />
            </div>
          )}

          {/* Render Table Data if provided */}
          {question.stimulus.tableData && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-800 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    {question.stimulus.tableData.headers.map((h, idx) => (
                      <th key={idx} className="p-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {question.stimulus.tableData.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-red-50/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 text-slate-700 font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* TAHAP B: MENGANALISIS PERTANYAAN */}
        <section className="space-y-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 p-4 sm:p-5">
          <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800 border-b border-amber-200/60 pb-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] text-white">
              B
            </span>
            <span>Tahap B — Menganalisis Pertanyaan & Besaran Relevan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="rounded-xl bg-white p-3 border border-amber-100 shadow-xs">
              <span className="font-bold text-slate-900 block mb-1">Diketahui:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                {question.known.map((k, idx) => (
                  <li key={idx}>{k}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-3 border border-amber-100 shadow-xs">
              <span className="font-bold text-slate-900 block mb-1">Ditanya:</span>
              <p className="text-slate-700 font-medium">{question.asked}</p>
            </div>
          </div>

          {/* Pertanyaan Utama */}
          <div className="pt-2">
            <h2 className={`${isIfpMode ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-black text-slate-900 leading-snug`}>
              {question.question}
            </h2>
          </div>
        </section>

        {/* TAHAP C: MENJAWAB MANDIRI */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-white">
                C
              </span>
              <span>Tahap C — Menjawab Mandiri</span>
            </span>
            {question.type === 'pilihan_ganda_kompleks' && (
              <span className="text-xs font-bold text-red-600">Pilih SEMUA opsi yang benar</span>
            )}
            {question.type === 'benar_salah' && (
              <span className="text-xs font-bold text-red-600">Pilih Benar atau Salah tiap poin</span>
            )}
          </div>

          {/* TYPE 1: PILIHAN GANDA (SINGLE CHOICE) */}
          {question.type === 'pilihan_ganda' && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = singleChoice === option.key;
                const isCorrectOption = option.key === question.correctSingleAnswer;
                let optionStyle =
                  'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/30 text-slate-800';

                if (isSubmitted) {
                  if (isCorrectOption) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = 'border-red-500 bg-red-50/80 text-red-950 font-bold';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-70';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-400';
                }

                return (
                  <button
                    key={option.key}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => setSingleChoice(option.key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3 cursor-pointer ${optionStyle}`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-black text-sm ${
                        isSubmitted && isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : isSubmitted && isSelected && !isCorrectOption
                          ? 'bg-red-600 text-white'
                          : isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {option.key}
                    </span>
                    <span className={`${isIfpMode ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} pt-0.5 leading-snug`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 2: PILIHAN GANDA KOMPLEKS (MULTI CHOICE) */}
          {question.type === 'pilihan_ganda_kompleks' && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = complexChoices.includes(option.key);
                const isCorrect = question.correctComplexAnswers?.includes(option.key);
                let optionStyle =
                  'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/30 text-slate-800';

                if (isSubmitted) {
                  if (isSelected && isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-red-500 bg-red-50 text-red-950 font-bold';
                  } else if (!isSelected && isCorrect) {
                    optionStyle = 'border-amber-400 bg-amber-50 text-amber-950 font-semibold';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-70';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-400';
                }

                return (
                  <div
                    key={option.key}
                    onClick={() => handleToggleComplexChoice(option.key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3 cursor-pointer ${optionStyle}`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-bold text-xs ${
                        isSelected
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {isSelected ? <Check className="h-4 w-4 stroke-[3]" /> : option.key}
                    </div>
                    <div className="flex-1">
                      <span className={`${isIfpMode ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} block leading-snug`}>
                        {option.text}
                      </span>
                      {isSubmitted && question.complexExplanation?.[option.key] && (
                        <p className="mt-2 text-xs font-medium text-slate-600 bg-white/70 rounded-lg p-2 border border-slate-200/60">
                          {question.complexExplanation[option.key]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TYPE 3: BENAR - SALAH (3 STATEMENTS) */}
          {question.type === 'benar_salah' && question.statements && (
            <div className="space-y-4">
              {question.statements.map((stmt, idx) => {
                const userChoice = tfDecisions[stmt.id];
                const isEvaluated = isSubmitted && userChoice !== undefined && userChoice !== null;
                const isStmtCorrect = isEvaluated && userChoice === stmt.isCorrect;

                return (
                  <div
                    key={stmt.id}
                    className={`rounded-2xl border p-4 transition-all ${
                      isEvaluated
                        ? isStmtCorrect
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : 'border-red-300 bg-red-50/40'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                          {idx + 1}
                        </span>
                        <p className={`${isIfpMode ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} font-medium text-slate-900 leading-snug`}>
                          {stmt.statement}
                        </p>
                      </div>

                      {/* Decision buttons: BENAR / SALAH */}
                      <div className="flex shrink-0 space-x-2">
                        <button
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectTrueFalse(stmt.id, true)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                            userChoice === true
                              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                              : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          BENAR
                        </button>
                        <button
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectTrueFalse(stmt.id, false)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                            userChoice === false
                              ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-400'
                              : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700'
                          }`}
                        >
                          SALAH
                        </button>
                      </div>
                    </div>

                    {/* Explanation after submission */}
                    {isSubmitted && (
                      <div className="mt-3 rounded-xl bg-white p-3 border border-slate-200 text-xs text-slate-700">
                        <div className="flex items-center space-x-1.5 font-bold mb-1">
                          <span className={stmt.isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                            Kunci: {stmt.isCorrect ? 'BENAR' : 'SALAH'}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className={isStmtCorrect ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                            {isStmtCorrect ? 'Jawabanmu Tepat (+33%)' : 'Jawabanmu Kurang Tepat (0%)'}
                          </span>
                        </div>
                        <p>{stmt.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Submit Action Button */}
          {!isSubmitted && (
            <div className="pt-3">
              <button
                type="button"
                onClick={handleSubmitAnswer}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-black text-sm sm:text-base shadow-xl transition active:scale-95 cursor-pointer"
              >
                <CheckCircle className="h-5 w-5" />
                <span>JAWAB SEKARANG & LIHAT PEMBAHASAN</span>
              </button>
            </div>
          )}
        </section>

        {/* TAHAP D, E, F, G, H: EVALUASI, PEMBAHASAN, CARA CEPAT & RUMUS (VISIBLE AFTER SUBMIT) */}
        {isSubmitted && (
          <div className="space-y-6 pt-6 border-t-2 border-red-100">
            {/* TAHAP D: EVALUASI JAWABAN */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border ${
                userAnswer?.score === 100
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : userAnswer?.score && userAnswer.score > 0
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}
            >
              <div className="flex items-center space-x-2 font-extrabold text-sm mb-1">
                {userAnswer?.score === 100 ? (
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                )}
                <span>Tahap D — Evaluasi Mister Jo (Skor: {userAnswer?.score ?? 0}%)</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {userAnswer?.score === 100
                  ? question.narration.correctFeedback
                  : question.narration.incorrectFeedback}
              </p>
            </div>

            {/* Mentoring Tabs: PEMBAHASAN NORMAL, CARA CEPAT, RUMUS KUNCI, REFLEKSI */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => {
                  setActiveTab('solution');
                  handleReadSolution();
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'solution'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Tahap E: Pembahasan Rinci</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('quickTrick');
                  handleReadQuickTrick();
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'quickTrick'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Zap className="h-4 w-4 fill-current" />
                <span>Tahap F: Cara Cepat</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('formula');
                  handleReadFormula();
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'formula'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Tahap G: Rumus Kunci</span>
              </button>

              <button
                onClick={() => setActiveTab('reflection')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'reflection'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Tahap H: Refleksi Mini</span>
              </button>
            </div>

            {/* Content for Active Mentoring Tab */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              {activeTab === 'solution' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-red-600" />
                      <span>Pembahasan Langkah demi Langkah</span>
                    </h3>
                    <button
                      onClick={handleReadSolution}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>Dengarkan Pembahasan</span>
                    </button>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {question.solution.steps.map((step, idx) => (
                      <li key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="rounded-xl bg-red-50 p-3.5 border border-red-200 text-xs sm:text-sm font-bold text-red-900">
                    Kesimpulan Akhir: {question.solution.summary}
                  </div>
                </div>
              )}

              {activeTab === 'quickTrick' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-amber-900 text-base flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-amber-500 fill-current" />
                      <span>{question.quickTrick.title}</span>
                    </h3>
                    <button
                      onClick={handleReadQuickTrick}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center space-x-1 cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>Dengarkan Trik</span>
                    </button>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    {question.quickTrick.trick}
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    <strong>Batasan Penggunaan:</strong> {question.quickTrick.limitation}
                  </p>
                </div>
              )}

              {activeTab === 'formula' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                      <HelpCircle className="h-5 w-5 text-sky-600" />
                      <span>Rumus Kunci & Konvensi Tanda</span>
                    </h3>
                    <button
                      onClick={handleReadFormula}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1 cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>Dengarkan Rumus</span>
                    </button>
                  </div>
                  <div className="rounded-xl bg-slate-900 p-4 font-mono text-amber-300 text-sm sm:text-base text-center shadow-inner">
                    {question.keyFormula.formula}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {question.keyFormula.symbols.map((sym, idx) => (
                      <div key={idx} className="rounded-lg bg-slate-50 p-2 border border-slate-200">
                        <strong className="text-red-700 font-mono">{sym.symbol}</strong>: {sym.meaning} ({sym.unit})
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 bg-sky-50 p-3 rounded-xl border border-sky-200">
                    <strong>Catatan Kondisi Akomodasi:</strong> {question.keyFormula.notes}
                  </p>
                </div>
              )}

              {activeTab === 'reflection' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-purple-900 text-base flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                    <span>Tahap H: Refleksi Konsep Mini</span>
                  </h3>
                  <div className="rounded-xl bg-purple-50 p-4 border border-purple-200 text-xs sm:text-sm text-purple-950 font-bold">
                    ❓ {question.miniReflection.prompt}
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-purple-700 block mb-1">
                      💡 Intisari Pemikiran Mister Jo:
                    </span>
                    {question.miniReflection.conceptTakeaway}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons: SOAL SEBELUMNYA & SOAL BERIKUTNYA */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onPrevQuestion}
            disabled={questionIndex === 0}
            className="flex items-center space-x-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-5 py-3 font-bold text-xs sm:text-sm text-slate-700 transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>SOAL SEBELUMNYA</span>
          </button>

          <span className="text-xs font-bold text-slate-500">
            {question.number} dari {totalQuestions}
          </span>

          <button
            type="button"
            onClick={onNextQuestion}
            disabled={questionIndex === totalQuestions - 1}
            className="flex items-center space-x-2 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white px-5 py-3 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <span>SOAL BERIKUTNYA</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
