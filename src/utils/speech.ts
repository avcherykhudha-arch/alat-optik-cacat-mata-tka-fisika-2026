import { VoiceSettings } from '../types';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  autoPlay: true,
  voiceURI: null,
};

export type SpeechState = 'idle' | 'speaking' | 'paused';

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<(state: SpeechState, text: string) => void> = new Set();
  private state: SpeechState = 'idle';
  private currentText: string = '';
  private lastSpokenText: string = '';
  private settings: VoiceSettings = { ...DEFAULT_VOICE_SETTINGS };
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    this.availableVoices = this.synth.getVoices();
    return this.availableVoices;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.availableVoices.length === 0) {
      this.loadVoices();
    }
    return this.availableVoices;
  }

  public getIndonesianVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    // Prioritize id-ID voices
    const idVoices = voices.filter(
      (v) => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().includes('indonesia')
    );
    if (idVoices.length > 0) {
      // Find natural or neural voices if available
      const natural = idVoices.find(
        (v) =>
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('gadis') ||
          v.name.toLowerCase().includes('andika') ||
          v.name.toLowerCase().includes('damayanti')
      );
      return natural || idVoices[0];
    }
    // Fallback: any voice
    return voices.length > 0 ? voices[0] : null;
  }

  public updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public getSettings(): VoiceSettings {
    return this.settings;
  }

  public subscribe(callback: (state: SpeechState, text: string) => void): () => void {
    this.listeners.add(callback);
    callback(this.state, this.currentText);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.state, this.currentText));
  }

  /**
   * Translates physics symbols, equations, and shorthand into natural spoken Indonesian.
   */
  public cleanSpeechText(text: string): string {
    if (!text) return '';

    let spoken = text;

    // Remove markdown symbols (asterisks, hashes, backticks)
    spoken = spoken.replace(/[#*`_~]/g, '');

    // Common physics replacements
    const replacements: [RegExp, string][] = [
      [/\bf_ob\b|\bfob\b/gi, 'fokus objektif'],
      [/\bf_ok\b|\bfok\b/gi, 'fokus okuler'],
      [/\bf_p\b|\bfp\b/gi, 'fokus pembalik'],
      [/\bs_ob\b|\bsob\b/gi, 'jarak benda objektif'],
      [/\bs'_ob\b|\bs'ob\b/gi, 'jarak bayangan objektif'],
      [/\bs'\b/g, 'jarak bayangan aksen'],
      [/\bs\b/g, 'jarak benda'],
      [/\bf\b/g, 'fokus lensa'],
      [/\bM_ob\b|\bMob\b/gi, 'perbesaran objektif'],
      [/\bM_ok\b|\bMok\b/gi, 'perbesaran okuler'],
      [/\bM\b/g, 'perbesaran'],
      [/\bd\b/g, 'panjang tabung alat'],
      [/\bSn\b/g, 'titik dekat normal 25 sentimeter'],
      [/\bPP\b/g, 'titik dekat punctum proximum'],
      [/\bPR\b/g, 'titik jauh punctum remotum'],
      [/\bP\b/g, 'kekuatan lensa'],
      [/\bdioptri\b|\bD\b/g, 'dioptri'],
      [/\bcm\b/gi, 'sentimeter'],
      [/\bmm\b/gi, 'milimeter'],
      [/\bm\b/g, 'meter'],
      [/\b1\/f\b/g, 'satu per fokus'],
      [/\b1\/s\b/g, 'satu per jarak benda'],
      [/\b1\/s'\b/g, 'satu per jarak bayangan'],
      [/≈/g, 'mendekati'],
      [/±/g, 'plus minus'],
      [/×/g, 'kali'],
      [/÷/g, 'bagi'],
      [/≠/g, 'tidak sama dengan'],
      [/≤/g, 'kurang dari sama dengan'],
      [/≥/g, 'lebih dari sama dengan'],
      [/∞/g, 'tak terhingga'],
      [/\b(\d+)\s*\/\s*(\d+)\b/g, '$1 per $2'],
      [/\b(\d+),(\d+)\b/g, '$1 koma $2'],
    ];

    for (const [pattern, repl] of replacements) {
      spoken = spoken.replace(pattern, repl);
    }

    return spoken.trim();
  }

  public speak(rawText: string, onEnd?: () => void) {
    if (!this.synth || !this.settings.enabled) return;

    this.stop();

    const naturalText = this.cleanSpeechText(rawText);
    this.currentText = rawText;
    this.lastSpokenText = rawText;

    const utterance = new SpeechSynthesisUtterance(naturalText);
    this.currentUtterance = utterance;

    // Configure voice
    let selectedVoice: SpeechSynthesisVoice | null = null;
    if (this.settings.voiceURI) {
      selectedVoice = this.getVoices().find((v) => v.voiceURI === this.settings.voiceURI) || null;
    }
    if (!selectedVoice) {
      selectedVoice = this.getIndonesianVoice();
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = 'id-ID';
    }

    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;
    utterance.volume = this.settings.volume;

    utterance.onstart = () => {
      this.state = 'speaking';
      this.notify();
    };

    utterance.onpause = () => {
      this.state = 'paused';
      this.notify();
    };

    utterance.onresume = () => {
      this.state = 'speaking';
      this.notify();
    };

    utterance.onend = () => {
      this.state = 'idle';
      this.currentUtterance = null;
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.state = 'idle';
      this.currentUtterance = null;
      this.notify();
    };

    // Chrome bug prevention: cancel any stuck queue before speaking
    this.synth.cancel();

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Failed to invoke speak:', err);
      this.state = 'idle';
      this.notify();
    }
  }

  public pause() {
    if (this.synth && this.state === 'speaking') {
      this.synth.pause();
      this.state = 'paused';
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state === 'paused') {
      this.synth.resume();
      this.state = 'speaking';
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.state = 'idle';
    this.currentUtterance = null;
    this.notify();
  }

  public repeat() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  public getState(): SpeechState {
    return this.state;
  }

  public getCurrentText(): string {
    return this.currentText;
  }
}

export const speechManager = new SpeechManager();
