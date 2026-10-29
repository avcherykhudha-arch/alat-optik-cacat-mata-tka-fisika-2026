import { AppProgress, VoiceSettings } from '../types';
import { DEFAULT_VOICE_SETTINGS } from './speech';

const STORAGE_KEYS = {
  PROGRESS: 'fisika_jenius_progress_v1',
  VOICE_SETTINGS: 'fisika_jenius_voice_settings_v1',
  IFP_MODE: 'fisika_jenius_ifp_mode_v1',
};

export const INITIAL_PROGRESS: AppProgress = {
  answers: {},
  viewedSolutions: {},
  currentQuestionIndex: 0,
  isCompleted: false,
  lastUpdated: new Date().toISOString(),
};

export function loadProgress(): AppProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      answers: parsed.answers || {},
      viewedSolutions: parsed.viewedSolutions || {},
      currentQuestionIndex: typeof parsed.currentQuestionIndex === 'number' ? parsed.currentQuestionIndex : 0,
      isCompleted: Boolean(parsed.isCompleted),
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to load progress from localStorage:', err);
    return INITIAL_PROGRESS;
  }
}

export function saveProgress(progress: AppProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const dataToSave: AppProgress = {
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(dataToSave));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export function resetProgressOnly(): AppProgress {
  const resetState: AppProgress = {
    answers: {},
    viewedSolutions: {},
    currentQuestionIndex: 0,
    isCompleted: false,
    lastUpdated: new Date().toISOString(),
  };
  saveProgress(resetState);
  return resetState;
}

export function loadVoiceSettings(): VoiceSettings {
  if (typeof window === 'undefined') return DEFAULT_VOICE_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOICE_SETTINGS);
    if (!raw) return DEFAULT_VOICE_SETTINGS;
    return { ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_VOICE_SETTINGS;
  }
}

export function saveVoiceSettings(settings: VoiceSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.VOICE_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save voice settings:', err);
  }
}

export function loadIfpMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEYS.IFP_MODE) === 'true';
  } catch {
    return false;
  }
}

export function saveIfpMode(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.IFP_MODE, String(enabled));
  } catch (err) {
    console.error('Failed to save IFP mode:', err);
  }
}
