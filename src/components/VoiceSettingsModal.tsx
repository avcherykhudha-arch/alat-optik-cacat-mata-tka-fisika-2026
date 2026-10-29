import React, { useEffect, useState } from 'react';
import { X, Volume2, Mic, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { speechManager } from '../utils/speech';
import { VoiceSettings } from '../types';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onSave: (settings: VoiceSettings) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = useState<VoiceSettings>(settings);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [testStatus, setTestStatus] = useState<string>('');

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (isOpen) {
      const voices = speechManager.loadVoices();
      setAvailableVoices(voices);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestVoice = () => {
    setTestStatus('Memutar suara uji...');
    const testText =
      'Halo! Saya Mister Jo. Selamat datang di Fisika Jenius. Fokus lensa f bernilai positif untuk lensa cembung dan negatif untuk lensa cekung.';
    speechManager.updateSettings(localSettings);
    speechManager.speak(testText, () => {
      setTestStatus('Uji suara selesai!');
      setTimeout(() => setTestStatus(''), 2000);
    });
  };

  const handleSave = () => {
    speechManager.updateSettings(localSettings);
    onSave(localSettings);
    onClose();
  };

  // Group Indonesian voices vs others
  const idVoices = availableVoices.filter(
    (v) => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().includes('indonesia')
  );
  const otherVoices = availableVoices.filter(
    (v) => !v.lang.toLowerCase().startsWith('id') && !v.lang.toLowerCase().includes('indonesia')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-red-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-red-100 text-red-600">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pengaturan Suara Mister Jo</h3>
              <p className="text-xs text-slate-500">Konfigurasi Web Speech API & Bahasa Indonesia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-sm">
          {/* Suara Aktif Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div>
              <label className="font-semibold text-slate-800">Aktifkan Narator Suara</label>
              <p className="text-xs text-slate-500">Mister Jo membacakan soal, stimulus, dan pembahasan</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.enabled}
              onChange={(e) => setLocalSettings({ ...localSettings, enabled: e.target.checked })}
              className="h-5 w-5 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
            />
          </div>

          {/* Auto Play Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div>
              <label className="font-semibold text-slate-800">Baca Otomatis Saat Berpindah Soal</label>
              <p className="text-xs text-slate-500">Mister Jo langsung membacakan nomor dan stimulus saat dibuka</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.autoPlay}
              onChange={(e) => setLocalSettings({ ...localSettings, autoPlay: e.target.checked })}
              className="h-5 w-5 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
            />
          </div>

          {/* Voice Selection */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Pilihan Suara (Web Speech API)
            </label>
            <select
              value={localSettings.voiceURI || ''}
              onChange={(e) => setLocalSettings({ ...localSettings, voiceURI: e.target.value || null })}
              className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-red-500 focus:ring-red-500"
            >
              <option value="">Paling Sesuai / Suara Bawaan Sistem (id-ID)</option>
              {idVoices.length > 0 && (
                <optgroup label="Suara Bahasa Indonesia (Direkomendasikan)">
                  {idVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      🇮🇩 {v.name} ({v.lang})
                    </option>
                  ))}
                </optgroup>
              )}
              {otherVoices.length > 0 && (
                <optgroup label="Suara Perangkat Lainnya">
                  {otherVoices.slice(0, 15).map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            {idVoices.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                Catatan: Perangkat Anda belum memiliki paket suara id-ID khusus. Sistem menggunakan suara sistem terbaik.
              </p>
            )}
          </div>

          {/* Kecepatan Suara (Rate) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-800">Kecepatan Bicara</label>
              <span className="font-bold text-red-600">{localSettings.rate}x</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Lambat (0.8x)', val: 0.8 },
                { label: 'Normal (1.0x)', val: 1.0 },
                { label: 'Cepat (1.25x)', val: 1.25 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, rate: opt.val })}
                  className={`rounded-xl py-2 text-xs font-semibold border transition cursor-pointer ${
                    localSettings.rate === opt.val
                      ? 'border-red-600 bg-red-600 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Uji Suara */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleTestVoice}
              className="w-full flex items-center justify-center space-x-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 py-2.5 font-bold text-xs transition cursor-pointer"
            >
              <Volume2 className="h-4 w-4" />
              <span>Uji Contoh Suara Mister Jo Sekarang</span>
            </button>
            {testStatus && (
              <p className="text-center text-xs font-medium text-emerald-600 mt-1 animate-pulse">
                {testStatus}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-red-600 hover:bg-red-700 px-5 py-2 font-bold text-xs text-white shadow-md cursor-pointer"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
