import React, { useState, useEffect, useRef } from 'react';
import { ALL_QUESTIONS } from './data/questions';
import { ActiveTab, Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { QuestionCard } from './components/QuestionCard';
import { FormulaReferenceView } from './components/FormulaReferenceView';
import { ReportView } from './components/ReportView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import {
  loadProgress,
  saveProgress,
  resetProgressOnly,
  loadVoiceSettings,
  saveVoiceSettings,
  loadIfpMode,
  saveIfpMode,
} from './utils/storage';
import { speechManager } from './utils/speech';
import { AppProgress, UserAnswer, VoiceSettings } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [progress, setProgress] = useState<AppProgress>(loadProgress);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(loadVoiceSettings);
  const [isIfpMode, setIsIfpMode] = useState<boolean>(loadIfpMode);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isVoiceSettingsModalOpen, setIsVoiceSettingsModalOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Sync settings with speech engine
  useEffect(() => {
    speechManager.updateSettings(voiceSettings);
  }, [voiceSettings]);

  // Track fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Save progress on changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // First user interaction listener to allow SpeechSynthesis
  useEffect(() => {
    const markInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', markInteraction);
      window.removeEventListener('keydown', markInteraction);
    };
    window.addEventListener('click', markInteraction);
    window.addEventListener('keydown', markInteraction);
    return () => {
      window.removeEventListener('click', markInteraction);
      window.removeEventListener('keydown', markInteraction);
    };
  }, []);

  const totalQuestions = ALL_QUESTIONS.length;
  const currentQIndex = progress.currentQuestionIndex;
  const currentQuestion = ALL_QUESTIONS[currentQIndex] || ALL_QUESTIONS[0];

  // Completed questions count and average score
  const completedCount = Object.keys(progress.answers).filter(
    (id) => progress.answers[Number(id)]?.isSubmitted
  ).length;

  let totalScoreSum = 0;
  Object.values(progress.answers).forEach((a) => {
    if (a?.isSubmitted) totalScoreSum += a.score;
  });
  const averageScore = completedCount > 0 ? totalScoreSum / completedCount : 0;

  // Question answered lookup table for quick dots
  const answeredMap: Record<number, boolean> = {};
  Object.entries(progress.answers).forEach(([id, a]) => {
    if (a?.isSubmitted) {
      answeredMap[Number(id)] = true;
    }
  });

  // Switch tabs with voice narration handling
  const handleTabChange = (tab: ActiveTab) => {
    speechManager.stop();
    setActiveTab(tab);

    if (tab === 'home') {
      speechManager.speak('Kembali ke Halaman Utama Fisika Jenius bersama Mister Jo.');
    } else if (tab === 'quiz') {
      speechManager.speak(
        `Membuka Soal Latihan nomor ${currentQuestion.number}. Topik: ${currentQuestion.topic}.`
      );
    } else if (tab === 'formulas') {
      speechManager.speak('Membuka Menu Rumus Kunci dan Materi Inti Alat Optik.');
    } else if (tab === 'report') {
      speechManager.speak('Membuka Laporan Hasil Belajar dan Progres Latihan.');
    }
  };

  // Save student answer
  const handleSaveAnswer = (questionId: number, answer: UserAnswer) => {
    const updatedAnswers = { ...progress.answers, [questionId]: answer };
    const allAnswered = Object.keys(updatedAnswers).length === totalQuestions;
    setProgress((prev) => ({
      ...prev,
      answers: updatedAnswers,
      isCompleted: allAnswered,
    }));
  };

  // Prev / Next question navigation
  const handlePrevQuestion = () => {
    speechManager.stop();
    if (currentQIndex > 0) {
      const nextIndex = currentQIndex - 1;
      setProgress((prev) => ({ ...prev, currentQuestionIndex: nextIndex }));
      const nextQ = ALL_QUESTIONS[nextIndex];
      if (voiceSettings.autoPlay && hasInteracted) {
        setTimeout(() => {
          speechManager.speak(nextQ.narration.stimulusAndQuestion);
        }, 200);
      }
    }
  };

  const handleNextQuestion = () => {
    speechManager.stop();
    if (currentQIndex < totalQuestions - 1) {
      const nextIndex = currentQIndex + 1;
      setProgress((prev) => ({ ...prev, currentQuestionIndex: nextIndex }));
      const nextQ = ALL_QUESTIONS[nextIndex];
      if (voiceSettings.autoPlay && hasInteracted) {
        setTimeout(() => {
          speechManager.speak(nextQ.narration.stimulusAndQuestion);
        }, 200);
      }
    } else {
      // Reached end of 30 questions
      setActiveTab('report');
    }
  };

  const handleJumpToQuestion = (index: number) => {
    speechManager.stop();
    setProgress((prev) => ({ ...prev, currentQuestionIndex: index }));
    const nextQ = ALL_QUESTIONS[index];
    if (voiceSettings.autoPlay && hasInteracted) {
      setTimeout(() => {
        speechManager.speak(nextQ.narration.stimulusAndQuestion);
      }, 200);
    }
  };

  const handleToggleIfpMode = () => {
    const nextMode = !isIfpMode;
    setIsIfpMode(nextMode);
    saveIfpMode(nextMode);
  };

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  const handleConfirmReset = (includeVoice: boolean) => {
    speechManager.stop();
    const fresh = resetProgressOnly();
    setProgress(fresh);
    if (includeVoice) {
      const defaultVoice: VoiceSettings = {
        enabled: true,
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        autoPlay: true,
        voiceURI: null,
      };
      setVoiceSettings(defaultVoice);
      saveVoiceSettings(defaultVoice);
    }
    setActiveTab('home');
    speechManager.speak('Progres belajar telah berhasil direset ke kondisi awal.');
  };

  const handleUpdateVoiceSettings = (partial: Partial<VoiceSettings>) => {
    const updated = { ...voiceSettings, ...partial };
    setVoiceSettings(updated);
    saveVoiceSettings(updated);
    speechManager.updateSettings(updated);
  };

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-800 antialiased selection:bg-red-500 selection:text-white ${isIfpMode ? 'text-lg font-medium' : ''}`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        completedCount={completedCount}
        totalQuestions={totalQuestions}
        isIfpMode={isIfpMode}
        onToggleIfpMode={handleToggleIfpMode}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-36">
        {activeTab === 'home' && (
          <HomeHero
            onStartQuiz={() => handleTabChange('quiz')}
            onOpenFormulas={() => handleTabChange('formulas')}
            onOpenReport={() => handleTabChange('report')}
            onOpenVoiceSettings={() => setIsVoiceSettingsModalOpen(true)}
            onOpenResetModal={() => setIsResetModalOpen(true)}
            completedCount={completedCount}
            totalQuestions={totalQuestions}
            averageScore={averageScore}
            isIfpMode={isIfpMode}
          />
        )}

        {activeTab === 'quiz' && (
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentQIndex}
            totalQuestions={totalQuestions}
            userAnswer={progress.answers[currentQuestion.id]}
            onSaveAnswer={handleSaveAnswer}
            onPrevQuestion={handlePrevQuestion}
            onNextQuestion={handleNextQuestion}
            onJumpToQuestion={handleJumpToQuestion}
            answeredQuestions={answeredMap}
            isIfpMode={isIfpMode}
          />
        )}

        {activeTab === 'formulas' && (
          <FormulaReferenceView
            onBackToQuiz={() => handleTabChange('quiz')}
            isIfpMode={isIfpMode}
          />
        )}

        {activeTab === 'report' && (
          <ReportView
            questions={ALL_QUESTIONS}
            answers={progress.answers}
            onRestartQuiz={() => handleConfirmReset(false)}
            onReviewQuestion={(idx) => {
              handleJumpToQuestion(idx);
              setActiveTab('quiz');
            }}
            onBackToMenu={() => handleTabChange('home')}
            isIfpMode={isIfpMode}
          />
        )}
      </main>

      {/* Persistent Audio Narrator Bar */}
      <AudioPlayerBar
        currentTextToSpeak={
          activeTab === 'quiz'
            ? currentQuestion.narration.stimulusAndQuestion
            : activeTab === 'formulas'
            ? 'Rumus Kunci dan Materi Inti Alat Optik bersama Mister Jo.'
            : 'Selamat datang di Fisika Jenius bersama Mister Jo.'
        }
        onOpenSettings={() => setIsVoiceSettingsModalOpen(true)}
        voiceSettings={voiceSettings}
        onUpdateSettings={handleUpdateVoiceSettings}
        isIfpMode={isIfpMode}
      />

      {/* Modals */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsModalOpen}
        onClose={() => setIsVoiceSettingsModalOpen(false)}
        settings={voiceSettings}
        onSave={(newSettings) => {
          setVoiceSettings(newSettings);
          saveVoiceSettings(newSettings);
        }}
      />

      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  );
}
