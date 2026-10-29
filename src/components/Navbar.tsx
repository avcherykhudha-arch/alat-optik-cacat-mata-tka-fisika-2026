import React from 'react';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  BarChart3,
  RotateCcw,
  Maximize2,
  Minimize2,
  Tv,
  Settings,
  Sparkles,
} from 'lucide-react';

export type ActiveTab = 'home' | 'quiz' | 'formulas' | 'report';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  completedCount: number;
  totalQuestions: number;
  isIfpMode: boolean;
  onToggleIfpMode: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenResetModal: () => void;
  onOpenVoiceSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  completedCount,
  totalQuestions,
  isIfpMode,
  onToggleIfpMode,
  isFullscreen,
  onToggleFullscreen,
  onOpenResetModal,
  onOpenVoiceSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-red-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo & Teacher Branding */}
          <div
            onClick={() => onTabChange('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md group-hover:scale-105 transition">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 group-hover:text-red-600 transition">
                  FISIKA <span className="text-red-600">JENIUS</span>
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-extrabold text-red-700 uppercase">
                  TKA FISIKA
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500">
                Laboratorium Alat Optik • <strong className="text-slate-800 font-semibold">Mister Jo</strong>
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onTabChange('quiz')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <span>Latihan 30 Soal</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px] font-extrabold">
                {completedCount}/{totalQuestions}
              </span>
            </button>
            <button
              onClick={() => onTabChange('formulas')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
                activeTab === 'formulas'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Materi & Rumus Kunci</span>
            </button>
            <button
              onClick={() => onTabChange('report')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Progres Belajar</span>
            </button>
          </nav>

          {/* Utility Action Buttons */}
          <div className="flex items-center space-x-1.5 md:space-x-2">
            {/* IFP Mode Toggle */}
            <button
              onClick={onToggleIfpMode}
              title={isIfpMode ? 'Mode Standar (Font Normal)' : 'Mode IFP / Papan Interaktif (Font Super Besar)'}
              className={`flex items-center space-x-1 px-2.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                isIfpMode
                  ? 'bg-red-100 border-red-300 text-red-700 shadow-inner'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Tv className="h-4 w-4" />
              <span className="hidden md:inline">{isIfpMode ? 'Mode IFP: Aktif' : 'Mode IFP'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (Fullscreen)'}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            {/* Voice Settings */}
            <button
              onClick={onOpenVoiceSettings}
              title="Pengaturan Suara Mister Jo"
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Settings className="h-4 w-4" />
            </button>

            {/* Reset Progres */}
            <button
              onClick={onOpenResetModal}
              title="Reset Progres Belajar"
              className="flex items-center space-x-1 px-2.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-bold transition cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1 scrollbar-none">
          <button
            onClick={() => onTabChange('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'home' ? 'bg-red-600 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onTabChange('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center space-x-1 ${
              activeTab === 'quiz' ? 'bg-red-600 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            <span>30 Soal</span>
            <span className="text-[10px] bg-black/20 rounded px-1">{completedCount}/30</span>
          </button>
          <button
            onClick={() => onTabChange('formulas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'formulas' ? 'bg-red-600 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            Materi & Rumus
          </button>
          <button
            onClick={() => onTabChange('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'report' ? 'bg-red-600 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            Laporan Hasil
          </button>
        </div>
      </div>
    </header>
  );
};
