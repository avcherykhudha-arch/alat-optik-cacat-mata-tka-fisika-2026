import React from 'react';
import { DiagramType } from '../types';

interface OpticsDiagramProps {
  type: DiagramType;
  className?: string;
}

export const OpticsDiagram: React.FC<OpticsDiagramProps> = ({ type, className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-red-100 bg-slate-900 text-white shadow-inner p-4 ${className}`}>
      {renderDiagram(type)}
    </div>
  );
};

function renderDiagram(type: DiagramType) {
  switch (type) {
    case 'lup_mata_berakomodasi':
      return (
        <svg viewBox="0 0 700 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Diagram Sinar Lup: Mata Berakomodasi Maksimum</title>
          {/* Sumbu Utama */}
          <line x1="20" y1="110" x2="680" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Lensa Cembung Lup */}
          <ellipse cx="380" cy="110" rx="14" ry="85" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="380" y1="15" x2="380" y2="205" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="380" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Lensa Lup (f)</text>

          {/* Titik Fokus */}
          <circle cx="220" cy="110" r="4" fill="#fbbf24" />
          <text x="220" y="130" fill="#fbbf24" fontSize="12" textAnchor="middle">F (Fokus)</text>

          <circle cx="540" cy="110" r="4" fill="#fbbf24" />
          <text x="540" y="130" fill="#fbbf24" fontSize="12" textAnchor="middle">F'</text>

          {/* Benda Nyata (di antara O dan F, s < f) */}
          <line x1="280" y1="110" x2="280" y2="70" stroke="#ef4444" strokeWidth="3.5" markerEnd="url(#arrow-red)" />
          <polygon points="280,62 275,72 285,72" fill="#ef4444" />
          <text x="280" y="55" fill="#fca5a5" fontSize="12" textAnchor="middle" fontWeight="bold">Benda (s &lt; f)</text>

          {/* Bayangan Maya (s' = -Sn pada titik dekat) */}
          <line x1="120" y1="110" x2="120" y2="30" stroke="#ec4899" strokeWidth="3" strokeDasharray="5 3" />
          <polygon points="120,22 115,32 125,32" fill="#ec4899" />
          <text x="120" y="18" fill="#f472b6" fontSize="12" textAnchor="middle" fontWeight="bold">Bayangan Maya (s' = -Sn)</text>

          {/* Berkas Sinar Utama */}
          {/* Sinar 1: Sejajar sumbu -> dibiaskan ke F' */}
          <line x1="280" y1="70" x2="380" y2="70" stroke="#fde047" strokeWidth="2" />
          <line x1="380" y1="70" x2="580" y2="125" stroke="#fde047" strokeWidth="2" />
          <line x1="380" y1="70" x2="120" y2="30" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Sinar 2: Menuju pusat optik O diteruskan */}
          <line x1="280" y1="70" x2="380" y2="110" stroke="#a78bfa" strokeWidth="2" />
          <line x1="380" y1="110" x2="580" y2="190" stroke="#a78bfa" strokeWidth="2" />
          <line x1="380" y1="110" x2="120" y2="30" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Mata Pengamat (Akomodasi Maksimum) */}
          <path d="M 600,100 Q 625,80 650,110 Q 625,140 600,120 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="618" cy="110" r="7" fill="#3b82f6" />
          <circle cx="618" cy="110" r="3" fill="#000" />
          <text x="625" y="155" fill="#e2e8f0" fontSize="12" textAnchor="middle">Mata Berakomodasi</text>
          <text x="625" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">Maksimum (s' = -25 cm)</text>
        </svg>
      );

    case 'lup_mata_tak_berakomodasi':
      return (
        <svg viewBox="0 0 700 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Diagram Sinar Lup: Mata Tidak Berakomodasi (Rileks)</title>
          <line x1="20" y1="110" x2="680" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Lensa Lup */}
          <ellipse cx="380" cy="110" rx="14" ry="85" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="380" y1="15" x2="380" y2="205" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="380" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Lensa Lup (f)</text>

          {/* Titik Fokus F (Benda tepat di F: s = f) */}
          <circle cx="240" cy="110" r="5" fill="#fbbf24" />
          <text x="240" y="130" fill="#fbbf24" fontSize="12" textAnchor="middle">F (Fokus, s = f)</text>

          <circle cx="520" cy="110" r="4" fill="#fbbf24" />
          <text x="520" y="130" fill="#fbbf24" fontSize="12" textAnchor="middle">F'</text>

          {/* Benda tepat di F */}
          <line x1="240" y1="110" x2="240" y2="65" stroke="#ef4444" strokeWidth="3.5" />
          <polygon points="240,57 235,67 245,67" fill="#ef4444" />
          <text x="240" y="50" fill="#fca5a5" fontSize="12" textAnchor="middle" fontWeight="bold">Benda tepat di F (s = f)</text>

          {/* Sinar 1: Sejajar sumbu -> dibiaskan melalui F' */}
          <line x1="240" y1="65" x2="380" y2="65" stroke="#fde047" strokeWidth="2" />
          <line x1="380" y1="65" x2="600" y2="135" stroke="#fde047" strokeWidth="2" />

          {/* Sinar 2: Melalui pusat optik O diteruskan */}
          <line x1="240" y1="65" x2="380" y2="110" stroke="#a78bfa" strokeWidth="2" />
          <line x1="380" y1="110" x2="600" y2="180" stroke="#a78bfa" strokeWidth="2" />

          {/* Sinar Keluar Sejajar */}
          <path d="M 520,105 L 540,112 M 520,150 L 540,157" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="500" y="85" fill="#38bdf8" fontSize="11">Sinar Keluar Sejajar</text>

          {/* Mata Rileks */}
          <path d="M 600,100 Q 625,80 650,110 Q 625,140 600,120 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="618" cy="110" r="7" fill="#10b981" />
          <circle cx="618" cy="110" r="3" fill="#000" />
          <text x="625" y="155" fill="#e2e8f0" fontSize="12" textAnchor="middle">Mata Rileks</text>
          <text x="625" y="170" fill="#94a3b8" fontSize="11" textAnchor="middle">Tanpa Akomodasi (s' = -∞)</text>
        </svg>
      );

    case 'mikroskop_skema':
    case 'mikroskop_akomodasi_maks':
      return (
        <svg viewBox="0 0 700 230" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Skema Optik Mikroskop Kompon Dua Lensa</title>
          <line x1="10" y1="115" x2="690" y2="115" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

          {/* Lensa Objektif (fob kecil) */}
          <ellipse cx="140" cy="115" rx="10" ry="75" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="140" y="205" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Lensa Objektif (fob)</text>

          {/* Benda preparat di Ruang II objektif (sob > fob) */}
          <line x1="80" y1="115" x2="80" y2="85" stroke="#ef4444" strokeWidth="3" />
          <polygon points="80,78 76,87 84,87" fill="#ef4444" />
          <text x="80" y="70" fill="#fca5a5" fontSize="11" textAnchor="middle" fontWeight="bold">Preparat (sob)</text>

          {/* Titik fokus fob */}
          <circle cx="105" cy="115" r="3.5" fill="#fbbf24" />
          <text x="105" y="132" fill="#fbbf24" fontSize="10" textAnchor="middle">fob</text>
          <circle cx="175" cy="115" r="3.5" fill="#fbbf24" />
          <text x="175" y="132" fill="#fbbf24" fontSize="10" textAnchor="middle">f'ob</text>

          {/* Bayangan Antara Objektif (Nyata, Terbalik, Diperbesar) */}
          <line x1="360" y1="115" x2="360" y2="175" stroke="#ec4899" strokeWidth="3.5" />
          <polygon points="360,183 355,173 365,173" fill="#ec4899" />
          <text x="360" y="200" fill="#f472b6" fontSize="11" textAnchor="middle" fontWeight="bold">Bayangan Nyata (s'ob)</text>

          {/* Lensa Okuler (fok > fob) */}
          <ellipse cx="480" cy="115" rx="14" ry="90" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2.5" />
          <text x="480" y="220" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">Lensa Okuler (fok)</text>

          {/* Titik fokus fok */}
          <circle cx="380" cy="115" r="4" fill="#a78bfa" />
          <text x="380" y="105" fill="#a78bfa" fontSize="10" textAnchor="middle">fok</text>

          {/* Garis Pembatas Tabung (d = s'ob + sok) */}
          <line x1="140" y1="25" x2="480" y2="25" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-yellow)" />
          <text x="310" y="20" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">Panjang Tabung d = s'ob + sok</text>

          {/* Berkas Sinar ke Okuler dan ke Mata */}
          <line x1="80" y1="85" x2="140" y2="85" stroke="#fde047" strokeWidth="1.5" />
          <line x1="140" y1="85" x2="360" y2="175" stroke="#fde047" strokeWidth="1.5" />
          <line x1="80" y1="85" x2="140" y2="115" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="140" y1="115" x2="360" y2="175" stroke="#a78bfa" strokeWidth="1.5" />

          {/* Sinar menuju mata */}
          <line x1="360" y1="175" x2="480" y2="145" stroke="#67e8f9" strokeWidth="1.5" />
          <line x1="480" y1="145" x2="610" y2="115" stroke="#67e8f9" strokeWidth="1.5" />

          {/* Mata Pengamat */}
          <path d="M 610,105 Q 635,85 660,115 Q 635,145 610,125 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="628" cy="115" r="7" fill="#38bdf8" />
          <circle cx="628" cy="115" r="3" fill="#000" />
          <text x="635" y="160" fill="#e2e8f0" fontSize="11" textAnchor="middle">Mata Pengamat</text>
        </svg>
      );

    case 'teropong_bintang_skema':
      return (
        <svg viewBox="0 0 700 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Skema Optik Teropong Bintang (Astronomis)</title>
          <line x1="10" y1="110" x2="690" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

          {/* Sinar sejajar dari bintang jauh (tak terhingga) */}
          <line x1="20" y1="50" x2="160" y2="70" stroke="#fde047" strokeWidth="2" />
          <line x1="20" y1="110" x2="160" y2="110" stroke="#fde047" strokeWidth="2" />
          <line x1="20" y1="170" x2="160" y2="150" stroke="#fde047" strokeWidth="2" />
          <text x="60" y="35" fill="#fde047" fontSize="11">Sinar Bintang Jauh (s = ∞)</text>

          {/* Lensa Objektif (fob panjang) */}
          <ellipse cx="160" cy="110" rx="14" ry="90" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="160" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Objektif (fob)</text>

          {/* Titik Fokus Berimpit (Fob = Fok) */}
          <circle cx="430" cy="110" r="5" fill="#fbbf24" />
          <text x="430" y="95" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">Fob ≡ Fok</text>

          {/* Bayangan antara terbalik nyata di Fob */}
          <line x1="430" y1="110" x2="430" y2="155" stroke="#ec4899" strokeWidth="3" />
          <polygon points="430,162 426,152 434,152" fill="#ec4899" />
          <text x="430" y="180" fill="#f472b6" fontSize="11" textAnchor="middle">Bayangan Antara (Nyata)</text>

          {/* Lensa Okuler (fok pendek) */}
          <ellipse cx="510" cy="110" rx="10" ry="70" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2.5" />
          <text x="510" y="195" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">Okuler (fok)</text>

          {/* Konvergensi ke fokus dan keluar sejajar */}
          <line x1="160" y1="70" x2="430" y2="155" stroke="#fde047" strokeWidth="1.5" />
          <line x1="160" y1="150" x2="430" y2="155" stroke="#fde047" strokeWidth="1.5" />

          <line x1="430" y1="155" x2="510" y2="85" stroke="#67e8f9" strokeWidth="1.5" />
          <line x1="510" y1="85" x2="620" y2="85" stroke="#67e8f9" strokeWidth="1.5" />
          <line x1="430" y1="155" x2="510" y2="135" stroke="#67e8f9" strokeWidth="1.5" />
          <line x1="510" y1="135" x2="620" y2="135" stroke="#67e8f9" strokeWidth="1.5" />

          {/* Dimensi Tabung d = fob + fok */}
          <line x1="160" y1="20" x2="510" y2="20" stroke="#fbbf24" strokeWidth="2" />
          <text x="335" y="15" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">d = fob + fok (Tanpa Akomodasi)</text>

          {/* Mata Rileks */}
          <path d="M 620,95 Q 645,75 670,105 Q 645,135 620,115 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="638" cy="105" r="7" fill="#10b981" />
          <circle cx="638" cy="105" r="3" fill="#000" />
        </svg>
      );

    case 'teropong_panggung_galilei':
      return (
        <svg viewBox="0 0 700 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Skema Optik Teropong Panggung (Galilei)</title>
          <line x1="10" y1="110" x2="690" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

          {/* Sinar datang sejajar */}
          <line x1="20" y1="60" x2="160" y2="75" stroke="#fde047" strokeWidth="2" />
          <line x1="20" y1="110" x2="160" y2="110" stroke="#fde047" strokeWidth="2" />
          <line x1="20" y1="160" x2="160" y2="145" stroke="#fde047" strokeWidth="2" />

          {/* Lensa Objektif Cembung (+) */}
          <ellipse cx="160" cy="110" rx="14" ry="90" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="160" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Objektif Cembung (fob &gt; 0)</text>

          {/* Lensa Okuler Cekung (-) */}
          <path d="M 430,35 Q 436,110 430,185 L 444,185 Q 438,110 444,35 Z" fill="#f43f5e" fillOpacity="0.35" stroke="#f43f5e" strokeWidth="2.5" />
          <text x="437" y="210" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">Okuler Cekung (fok &lt; 0)</text>

          {/* Titik fokus bersama di belakang okuler */}
          <circle cx="530" cy="110" r="4" fill="#fbbf24" />
          <text x="530" y="130" fill="#fbbf24" fontSize="11" textAnchor="middle">Fokus Bersama</text>

          {/* Berkas sinar dicegat okuler cekung sebelum sempat fokus */}
          <line x1="160" y1="75" x2="432" y2="95" stroke="#fde047" strokeWidth="1.5" />
          <line x1="432" y1="95" x2="530" y2="105" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 3" />

          <line x1="160" y1="145" x2="432" y2="125" stroke="#fde047" strokeWidth="1.5" />
          <line x1="432" y1="125" x2="530" y2="105" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Pembiasan oleh okuler cekung menjadi sejajar (TEGAK) */}
          <line x1="442" y1="95" x2="600" y2="80" stroke="#34d399" strokeWidth="2" />
          <line x1="442" y1="125" x2="600" y2="140" stroke="#34d399" strokeWidth="2" />
          <text x="520" y="70" fill="#34d399" fontSize="11">Sinar Keluar Tegak</text>

          {/* Dimensi Tabung Ringkas: d = fob - |fok| */}
          <line x1="160" y1="20" x2="437" y2="20" stroke="#fbbf24" strokeWidth="2" />
          <text x="298" y="15" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">d = fob - |fok| (Ringkas)</text>

          {/* Mata Pengamat */}
          <path d="M 600,95 Q 625,75 650,105 Q 625,135 600,115 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="618" cy="105" r="7" fill="#38bdf8" />
          <circle cx="618" cy="105" r="3" fill="#000" />
        </svg>
      );

    case 'teropong_bumi_pembalik':
      return (
        <svg viewBox="0 0 700 230" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Skema Optik Teropong Bumi Tiga Lensa Cembung</title>
          <line x1="10" y1="115" x2="690" y2="115" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

          {/* 1. Lensa Objektif */}
          <ellipse cx="100" cy="115" rx="12" ry="80" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
          <text x="100" y="210" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">Objektif (fob)</text>

          {/* Bayangan Pertama (Terbalik) */}
          <line x1="220" y1="115" x2="220" y2="155" stroke="#ec4899" strokeWidth="2.5" />
          <polygon points="220,160 216,150 224,150" fill="#ec4899" />
          <text x="220" y="175" fill="#f472b6" fontSize="10" textAnchor="middle">Bayangan 1 (Terbalik)</text>

          {/* 2. Lensa Pembalik (fp) */}
          <ellipse cx="320" cy="115" rx="10" ry="60" fill="#fbbf24" fillOpacity="0.25" stroke="#fbbf24" strokeWidth="2" />
          <text x="320" y="195" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">Pembalik (fp)</text>

          {/* Bayangan Kedua (Dibalik Tegak Kembali di 2fp) */}
          <line x1="420" y1="115" x2="420" y2="75" stroke="#10b981" strokeWidth="2.5" />
          <polygon points="420,70 416,80 424,80" fill="#10b981" />
          <text x="420" y="60" fill="#34d399" fontSize="10" textAnchor="middle">Bayangan 2 (Tegak)</text>

          {/* 3. Lensa Okuler */}
          <ellipse cx="540" cy="115" rx="12" ry="75" fill="#a78bfa" fillOpacity="0.25" stroke="#a78bfa" strokeWidth="2" />
          <text x="540" y="205" fill="#a78bfa" fontSize="11" textAnchor="middle" fontWeight="bold">Okuler (fok)</text>

          {/* Anotasi Jarak Pembalik: 4fp */}
          <line x1="220" y1="35" x2="420" y2="35" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="320" y="28" fill="#fbbf24" fontSize="10" textAnchor="middle">Panjang Pembalik = 4fp (2fp + 2fp)</text>

          {/* Garis Total Tabung: d = fob + 4fp + fok */}
          <line x1="100" y1="12" x2="540" y2="12" stroke="#e2e8f0" strokeWidth="2" />
          <text x="320" y="8" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">d = fob + 4fp + fok</text>

          {/* Mata Pengamat */}
          <path d="M 620,105 Q 645,85 670,115 Q 645,145 620,125 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="638" cy="115" r="7" fill="#38bdf8" />
          <circle cx="638" cy="115" r="3" fill="#000" />
        </svg>
      );

    case 'cacat_mata_miopi':
      return (
        <svg viewBox="0 0 700 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Koreksi Cacat Mata Miopi dengan Lensa Cekung</title>
          {/* Bagian Kiri: Tanpa Koreksi (Fokus di Depan Retina) */}
          <g transform="translate(10, 10)">
            <text x="140" y="20" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">Tanpa Kacamata: Titik Jauh PR &lt; ∞</text>
            {/* Bola Mata */}
            <circle cx="160" cy="95" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx="120" cy="95" rx="8" ry="24" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Retina */}
            <path d="M 195,65 Q 212,95 195,125" fill="none" stroke="#fbbf24" strokeWidth="4" />
            <text x="235" y="98" fill="#fbbf24" fontSize="10">Retina</text>
            {/* Sinar sejajar memotong di depan retina */}
            <line x1="30" y1="75" x2="120" y2="85" stroke="#fde047" strokeWidth="1.5" />
            <line x1="30" y1="115" x2="120" y2="105" stroke="#fde047" strokeWidth="1.5" />
            <line x1="120" y1="85" x2="175" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <line x1="120" y1="105" x2="175" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="175" cy="95" r="3.5" fill="#ef4444" />
            <text x="175" y="125" fill="#ef4444" fontSize="10" textAnchor="middle">Fokus di DEPAN retina</text>
          </g>

          {/* Garis Pemisah */}
          <line x1="330" y1="15" x2="330" y2="200" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />

          {/* Bagian Kanan: Dengan Kacamata Lensa Cekung P = -100/PR */}
          <g transform="translate(350, 10)">
            <text x="160" y="20" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">Dengan Lensa Cekung (P = -100/PR)</text>
            {/* Kacamata Cekung */}
            <path d="M 50,60 Q 55,95 50,130 L 60,130 Q 55,95 60,60 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="2" />
            <text x="55" y="150" fill="#f43f5e" fontSize="10" textAnchor="middle">Lensa Cekung</text>
            {/* Bola Mata */}
            <circle cx="190" cy="95" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx="150" cy="95" rx="8" ry="24" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Retina */}
            <path d="M 225,65 Q 242,95 225,125" fill="none" stroke="#fbbf24" strokeWidth="4" />
            {/* Sinar dibelokkan divergen lalu fokus tepat di retina */}
            <line x1="10" y1="80" x2="52" y2="85" stroke="#fde047" strokeWidth="1.5" />
            <line x1="10" y1="110" x2="52" y2="105" stroke="#fde047" strokeWidth="1.5" />
            <line x1="58" y1="85" x2="150" y2="80" stroke="#fde047" strokeWidth="1.5" />
            <line x1="58" y1="105" x2="150" y2="110" stroke="#fde047" strokeWidth="1.5" />
            <line x1="150" y1="80" x2="238" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <line x1="150" y1="110" x2="238" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="238" cy="95" r="4" fill="#10b981" />
            <text x="210" y="165" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Fokus TEPAT di Retina!</text>
          </g>
        </svg>
      );

    case 'cacat_mata_hipermetropi':
      return (
        <svg viewBox="0 0 700 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Koreksi Cacat Mata Hipermetropi dengan Lensa Cembung</title>
          {/* Bagian Kiri: Tanpa Koreksi (Fokus di Belakang Retina) */}
          <g transform="translate(10, 10)">
            <text x="140" y="20" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">Tanpa Kacamata: PP &gt; 25 cm</text>
            <circle cx="150" cy="95" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx="110" cy="95" rx="8" ry="24" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M 185,65 Q 202,95 185,125" fill="none" stroke="#fbbf24" strokeWidth="4" />
            {/* Sinar divergen dari Sn = 25 cm */}
            <circle cx="20" cy="95" r="3" fill="#ef4444" />
            <text x="20" y="115" fill="#fca5a5" fontSize="10" textAnchor="middle">Buku 25 cm</text>
            <line x1="20" y1="95" x2="110" y2="82" stroke="#fde047" strokeWidth="1.5" />
            <line x1="20" y1="95" x2="110" y2="108" stroke="#fde047" strokeWidth="1.5" />
            <line x1="110" y1="82" x2="225" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <line x1="110" y1="108" x2="225" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="225" cy="95" r="3.5" fill="#ef4444" />
            <text x="220" y="125" fill="#ef4444" fontSize="10" textAnchor="middle">Fokus di BELAKANG retina</text>
          </g>

          <line x1="330" y1="15" x2="330" y2="200" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />

          {/* Bagian Kanan: Dengan Kacamata Cembung */}
          <g transform="translate(350, 10)">
            <text x="160" y="20" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">Dengan Lensa Cembung P = 100/Sn - 100/PP</text>
            {/* Lensa Cembung Kacamata */}
            <ellipse cx="65" cy="95" rx="7" ry="32" fill="#34d399" fillOpacity="0.35" stroke="#34d399" strokeWidth="2" />
            <text x="65" y="145" fill="#34d399" fontSize="10" textAnchor="middle">Lensa Cembung</text>
            {/* Bola Mata */}
            <circle cx="185" cy="95" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx="145" cy="95" rx="8" ry="24" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M 220,65 Q 237,95 220,125" fill="none" stroke="#fbbf24" strokeWidth="4" />
            {/* Sinar dikonvergensikan dan jatuh tepat di retina */}
            <line x1="10" y1="95" x2="65" y2="80" stroke="#fde047" strokeWidth="1.5" />
            <line x1="10" y1="95" x2="65" y2="110" stroke="#fde047" strokeWidth="1.5" />
            <line x1="65" y1="80" x2="145" y2="85" stroke="#fde047" strokeWidth="1.5" />
            <line x1="65" y1="110" x2="145" y2="105" stroke="#fde047" strokeWidth="1.5" />
            <line x1="145" y1="85" x2="233" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <line x1="145" y1="105" x2="233" y2="95" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="233" cy="95" r="4" fill="#10b981" />
            <text x="210" y="165" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Fokus TEPAT di Retina!</text>
          </g>
        </svg>
      );

    case 'cacat_mata_presbiopi':
      return (
        <svg viewBox="0 0 700 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Struktur Kacamata Bifokal Presbiopi</title>
          {/* Ilustrasi Lensa Bifokal */}
          <rect x="80" y="25" width="180" height="150" rx="20" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
          {/* Garis batas segmen atas dan bawah */}
          <line x1="80" y1="110" x2="260" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
          
          {/* Segmen Atas (Jauh) */}
          <rect x="85" y="30" width="170" height="75" rx="15" fill="#38bdf8" fillOpacity="0.2" />
          <text x="170" y="65" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">Segmen Atas (Jauh)</text>
          <text x="170" y="85" fill="#e2e8f0" fontSize="11" textAnchor="middle">P_jauh = -100 / PR</text>

          {/* Segmen Bawah (Dekat / Baca) */}
          <rect x="85" y="115" width="170" height="55" rx="12" fill="#10b981" fillOpacity="0.2" />
          <text x="170" y="140" fill="#10b981" fontSize="13" textAnchor="middle" fontWeight="bold">Segmen Bawah (Baca)</text>
          <text x="170" y="158" fill="#e2e8f0" fontSize="11" textAnchor="middle">P_dekat = 100/Sn - 100/PP</text>

          {/* Penjelasan Fisiologis */}
          <g transform="translate(320, 25)">
            <text x="0" y="20" fill="#fbbf24" fontSize="14" fontWeight="bold">Karakteristik Mata Presbiopi (Mata Tua):</text>
            <text x="10" y="50" fill="#e2e8f0" fontSize="12">• Penurunan elastisitas kapsul lensa kristalin seiring usia.</text>
            <text x="10" y="75" fill="#e2e8f0" fontSize="12">• Titik dekat menjauh: PP &gt; 25 cm (sulit membaca tulisan dekat).</text>
            <text x="10" y="100" fill="#e2e8f0" fontSize="12">• Titik jauh menyusut: PR &lt; ∞ jika disertai kelainan refraksi.</text>
            <text x="10" y="125" fill="#e2e8f0" fontSize="12">• Solusi: Kacamata bifokal (atas untuk jauh, bawah untuk dekat).</text>
          </g>
        </svg>
      );

    case 'grafik_perbesaran_lup':
      return (
        <svg viewBox="0 0 700 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Grafik Perbesaran Lup terhadap Jarak Benda</title>
          {/* Sumbu X dan Y */}
          <line x1="80" y1="160" x2="620" y2="160" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-axis)" />
          <line x1="80" y1="160" x2="80" y2="20" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-axis)" />
          <text x="630" y="165" fill="#94a3b8" fontSize="12">Jarak Benda s (cm)</text>
          <text x="80" y="15" fill="#94a3b8" fontSize="12" textAnchor="middle">Perbesaran M</text>

          {/* Kurva Hiperbolik M = Sn / s */}
          <path d="M 120,40 Q 180,90 280,110 T 520,135" fill="none" stroke="#ef4444" strokeWidth="3" />

          {/* Titik s = f (Mata Rileks: M = Sn / f) */}
          <line x1="380" y1="160" x2="380" y2="120" stroke="#64748b" strokeDasharray="3 3" />
          <circle cx="380" cy="120" r="5" fill="#38bdf8" />
          <text x="380" y="180" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">s = f</text>
          <text x="400" y="115" fill="#38bdf8" fontSize="12">M = Sn / f (Rileks)</text>

          {/* Titik s_maks (Akomodasi Maks: M = Sn/f + 1) */}
          <line x1="220" y1="160" x2="220" y2="90" stroke="#64748b" strokeDasharray="3 3" />
          <circle cx="220" cy="90" r="5" fill="#10b981" />
          <text x="220" y="180" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">s &lt; f</text>
          <text x="130" y="85" fill="#10b981" fontSize="12">M = Sn/f + 1 (Maksimum)</text>

          <text x="350" y="45" fill="#fca5a5" fontSize="12" textAnchor="middle">Rentang Kerja Lup Normal (0 &lt; s ≤ f)</text>
        </svg>
      );

    case 'diagram_perbandingan_teropong':
      return (
        <svg viewBox="0 0 700 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <title>Perbandingan Panjang Tabung Ketiga Jenis Teropong</title>
          {/* Teropong Panggung (Bravo) */}
          <text x="40" y="45" fill="#34d399" fontSize="12" fontWeight="bold">Teropong Panggung (Galilei):</text>
          <rect x="230" y="30" width="220" height="24" rx="6" fill="#34d399" fillOpacity="0.4" stroke="#34d399" strokeWidth="2" />
          <text x="340" y="46" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="bold">d = 85 cm (Paling Ringkas, Bayangan Tegak)</text>

          {/* Teropong Bintang (Alpha) */}
          <text x="40" y="100" fill="#38bdf8" fontSize="12" fontWeight="bold">Teropong Bintang (Astronomis):</text>
          <rect x="230" y="85" width="260" height="24" rx="6" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
          <text x="360" y="101" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="bold">d = 95 cm (Bayangan Terbalik)</text>

          {/* Teropong Bumi (Charlie) */}
          <text x="40" y="155" fill="#fbbf24" fontSize="12" fontWeight="bold">Teropong Bumi (Tiga Lensa):</text>
          <rect x="230" y="140" width="340" height="24" rx="6" fill="#fbbf24" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="2" />
          <text x="400" y="156" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="bold">d = 111 cm (Paling Panjang + 4fp, Bayangan Tegak)</text>
        </svg>
      );

    case 'tabel_spesifikasi_alat':
    default:
      return (
        <div className="flex items-center justify-center p-6 text-center text-slate-300">
          <div className="space-y-1">
            <span className="inline-block rounded-full bg-red-950 px-3 py-1 text-xs font-semibold text-red-300 border border-red-800">
              Instrumen Laboratorium Fisika Jenius
            </span>
            <p className="text-sm text-slate-300">
              Perhatikan data spesifikasi fisis pada tabel dan wacana stimulus untuk melakukan inferensi matematis.
            </p>
          </div>
        </div>
      );
  }
}
