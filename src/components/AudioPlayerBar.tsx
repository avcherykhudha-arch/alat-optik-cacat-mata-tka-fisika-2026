import React, { useEffect, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  Settings,
  Sparkles,
  Gauge,
} from 'lucide-react';
import { speechManager, SpeechState } from '../utils/speech';
import { VoiceSettings } from '../types';

interface AudioPlayerBarProps {
  currentTextToSpeak?: string;
  onOpenSettings: () => void;
  voiceSettings: VoiceSettings;
  onUpdateSettings: (settings: Partial<VoiceSettings>) => void;
  isIfpMode?: boolean;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTextToSpeak = '',
  onOpenSettings,
  voiceSettings,
  onUpdateSettings,
  isIfpMode = false,
}) => {
  const [speechState, setSpeechState] = useState<SpeechState>('idle');
  const [activeSpeechText, setActiveSpeechText] = useState<string>('');

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((state, text) => {
      setSpeechState(state);
      setActiveSpeechText(text);
    });
    return () => unsubscribe();
  }, []);

  const handlePlay = () => {
    if (speechState === 'paused') {
      speechManager.resume();
    } else if (currentTextToSpeak) {
      speechManager.speak(currentTextToSpeak);
    }
  };

  const handlePause = () => {
    speechManager.pause();
  };

  const handleStop = () => {
    speechManager.stop();
  };

  const handleRepeat = () => {
    if (currentTextToSpeak) {
      speechManager.speak(currentTextToSpeak);
    } else {
      speechManager.repeat();
    }
  };

  const handleSpeedCycle = () => {
    const speeds = [0.8, 1.0, 1.25];
    const currentIndex = speeds.indexOf(voiceSettings.rate);
    const nextRate = speeds[(currentIndex + 1) % speeds.length];
    onUpdateSettings({ rate: nextRate });
    speechManager.updateSettings({ rate: nextRate });
  };

  const toggleSound = () => {
    const nextEnabled = !voiceSettings.enabled;
    if (!nextEnabled) {
      speechManager.stop();
    }
    onUpdateSettings({ enabled: nextEnabled });
    speechManager.updateSettings({ enabled: nextEnabled });
  };

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl rounded-2xl border border-red-200 bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-300 ${isIfpMode ? 'p-4' : 'p-3'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Mister Jo Branding & Live Wave Indicator */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md">
            <Sparkles className="h-5 w-5 animate-pulse" />
            {speechState === 'speaking' && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-sm md:text-base">Mister Jo</span>
              <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-700 uppercase tracking-wider">
                Narator TKA
              </span>
            </div>
            <p className="truncate text-xs text-slate-500 max-w-[220px] md:max-w-xs">
              {speechState === 'speaking'
                ? 'Sedang membimbing...'
                : speechState === 'paused'
                ? 'Suara dijeda'
                : 'Siap membimbing belajarmu'}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-1.5 md:space-x-2">
          {speechState === 'speaking' ? (
            <button
              onClick={handlePause}
              title="Jeda Narator"
              className="flex items-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 font-bold text-xs md:text-sm shadow transition active:scale-95 cursor-pointer"
            >
              <Pause className="h-4 w-4" />
              <span>JEDA</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              disabled={!voiceSettings.enabled}
              title="Baca Soal / Lanjutkan Narator"
              className="flex items-center space-x-1.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white px-3.5 py-2 font-bold text-xs md:text-sm shadow-md transition active:scale-95 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{speechState === 'paused' ? 'LANJUTKAN' : 'BACA SOAL'}</span>
            </button>
          )}

          <button
            onClick={handleRepeat}
            disabled={!voiceSettings.enabled}
            title="Ulangi Bacaan"
            className="flex items-center space-x-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 px-2.5 py-2 font-medium text-xs md:text-sm transition cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-slate-600" />
            <span className="hidden sm:inline">ULANGI</span>
          </button>

          <button
            onClick={handleStop}
            disabled={speechState === 'idle'}
            title="Hentikan Suara"
            className="flex items-center space-x-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 text-slate-700 px-2.5 py-2 font-medium text-xs md:text-sm transition cursor-pointer"
          >
            <Square className="h-4 w-4 fill-current" />
            <span className="hidden sm:inline">HENTIKAN</span>
          </button>

          {/* Speed Selector */}
          <button
            onClick={handleSpeedCycle}
            title={`Kecepatan Suara: ${voiceSettings.rate}x`}
            className="flex items-center space-x-1 rounded-xl border border-red-200 bg-red-50 text-red-700 px-2.5 py-2 font-bold text-xs md:text-sm hover:bg-red-100 transition cursor-pointer"
          >
            <Gauge className="h-4 w-4" />
            <span>{voiceSettings.rate}x</span>
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleSound}
            title={voiceSettings.enabled ? 'Bisukan Suara' : 'Aktifkan Suara'}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              voiceSettings.enabled
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'border-red-300 bg-red-100 text-red-600'
            }`}
          >
            {voiceSettings.enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            title="Pengaturan Suara Narator"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
