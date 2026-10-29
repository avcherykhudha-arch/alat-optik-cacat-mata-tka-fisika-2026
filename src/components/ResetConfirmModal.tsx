import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: (includeVoiceSettings: boolean) => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  const [includeVoice, setIncludeVoice] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-red-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Konfirmasi Reset Progres</h3>
            <p className="text-xs text-slate-500">Fisika Jenius — Mister Jo</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Apakah Anda yakin ingin mengatur ulang seluruh riwayat latihan? Seluruh jawaban tersimpan, skor nilai per soal, dan status pengerjaan akan dihapus dan dikembalikan ke kondisi awal (Soal 1).
        </p>

        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start space-x-2">
          <input
            type="checkbox"
            id="resetVoice"
            checked={includeVoice}
            onChange={(e) => setIncludeVoice(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-amber-300 text-red-600 focus:ring-red-500 cursor-pointer"
          />
          <label htmlFor="resetVoice" className="cursor-pointer">
            Sertakan juga reset pengaturan suara narator (kecepatan & preferensi suara) ke kondisi default.
          </label>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2.5 font-bold text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            BATAL
          </button>
          <button
            onClick={() => {
              onConfirmReset(includeVoice);
              onClose();
            }}
            className="flex items-center space-x-1.5 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-2.5 font-bold text-xs text-white shadow-md cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>YA, RESET PROGRES</span>
          </button>
        </div>
      </div>
    </div>
  );
};
