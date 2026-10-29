export interface FormulaItem {
  id: string;
  category: string;
  title: string;
  formulaDisplay: string;
  condition: string;
  symbols: { symbol: string; meaning: string; unit: string }[];
  explanation: string;
  example: {
    problem: string;
    calculation: string;
    result: string;
  };
  caution: string;
}

export const FORMULA_COLLECTION: FormulaItem[] = [
  {
    id: 'lensa-tipis',
    category: 'Dasar Optika Geometri',
    title: 'Persamaan Lensa Tipis Gauss',
    formulaDisplay: '1/f = 1/s + 1/s\'',
    condition: 'Berlaku untuk semua lensa tipis sferis dengan konvensi tanda kartesius standar.',
    symbols: [
      { symbol: 'f', meaning: 'Jarak fokus lensa (+ untuk cembung/konvergen, - untuk cekung/divergen)', unit: 'cm atau m' },
      { symbol: 's', meaning: 'Jarak benda dari pusat optik lensa (positif untuk benda nyata di depan lensa)', unit: 'cm atau m' },
      { symbol: 's\'', meaning: 'Jarak bayangan (positif untuk bayangan nyata di belakang lensa, negatif untuk maya)', unit: 'cm atau m' },
    ],
    explanation: 'Hubungan fundamental antara jarak fokus lensa dengan letak posisi benda dan bayangan yang dihasilkan.',
    example: {
      problem: 'Sebuah lilin diletakkan pada jarak 15 cm di depan lensa cembung dengan fokus 10 cm. Di manakah letak bayangannya?',
      calculation: '1/s\' = 1/f - 1/s = 1/10 - 1/15 = (3 - 2)/30 = 1/30 ==> s\' = +30 cm',
      result: 's\' = +30 cm (bayangan nyata, terbalik, terbentuk 30 cm di belakang lensa)',
    },
    caution: 'Pastikan satuan f, s, dan s\' seragam (semuanya dalam cm atau semuanya dalam m) sebelum menjumlahkan pecahan.',
  },
  {
    id: 'perbesaran-linear',
    category: 'Dasar Optika Geometri',
    title: 'Perbesaran Linear Bayangan (m)',
    formulaDisplay: 'm = -s\' / s    atau    |m| = |s\' / s| = h\' / h',
    condition: 'Digunakan untuk menghitung rasio tinggi bayangan terhadap tinggi benda pada lensa tunggal.',
    symbols: [
      { symbol: 'm', meaning: 'Perbesaran lateral atau linear', unit: 'tanpa satuan (kali)' },
      { symbol: 'h', meaning: 'Tinggi benda asli', unit: 'cm atau mm' },
      { symbol: 'h\'', meaning: 'Tinggi bayangan yang terbentuk', unit: 'cm atau mm' },
      { symbol: 's, s\'', meaning: 'Jarak benda dan jarak bayangan', unit: 'cm atau mm' },
    ],
    explanation: 'Nilai mutlak |m| menunjukkan berapa kali bayangan membesar/mengecil. Tanda negatif menunjukkan bayangan terbalik (nyata), sedangkan tanda positif menunjukkan tegak (maya).',
    example: {
      problem: 'Benda tinggi 2 cm diletakkan 12 cm di depan lensa cembung, bayangan nyata terbentuk di 24 cm.',
      calculation: '|m| = |24 / 12| = 2 kali. h\' = 2 × 2 cm = 4 cm.',
      result: 'Perbesaran 2 kali, bayangan terbalik, tinggi 4 cm.',
    },
    caution: 'Bedakan perbesaran linear (m) untuk lensa tunggal objektif dengan perbesaran sudut/anguler (M) pada lup dan teropong.',
  },
  {
    id: 'kekuatan-lensa',
    category: 'Dasar Optika Geometri',
    title: 'Kekuatan Lensa (Daya Dioptri)',
    formulaDisplay: 'P = 1 / f (dalam meter)    atau    P = 100 / f (dalam cm)',
    condition: 'Kemampuan lensa membelokkan berkas sinar. Nilai (+) untuk cembung, (-) untuk cekung.',
    symbols: [
      { symbol: 'P', meaning: 'Kekuatan atau daya lensa', unit: 'Dioptri (D)' },
      { symbol: 'f', meaning: 'Jarak fokus lensa', unit: 'meter (m) atau cm' },
    ],
    explanation: 'Semakin pendek jarak fokus lensa, semakin kuat daya lensa dalam membelokkan sinar cahaya yang melaluinya.',
    example: {
      problem: 'Sebuah lensa cekung memiliki jarak fokus 50 cm. Tentukan daya lensanya!',
      calculation: 'Lensa cekung memiliki f negatif: f = -50 cm = -0,5 m. P = 100 / (-50) = -2 Dioptri.',
      result: 'P = -2 Dioptri.',
    },
    caution: 'Selalu ingat konversi satuan: 1 meter = 100 cm. Jika memakai cm, gunakan rumus 100/f.',
  },
  {
    id: 'lup-akomodasi-maks',
    category: 'Lup (Kaca Pembesar)',
    title: 'Perbesaran Lup: Mata Berakomodasi Maksimum',
    formulaDisplay: 'M = (Sn / f) + 1',
    condition: 'Mata berakomodasi maksimum saat otot siliaris bekerja penuh. Bayangan maya terbentuk tepat di titik dekat (s\' = -Sn).',
    symbols: [
      { symbol: 'M', meaning: 'Perbesaran sudut (anguler)', unit: 'kali' },
      { symbol: 'Sn', meaning: 'Titik dekat mata pengamat (standar mata normal = 25 cm)', unit: 'cm' },
      { symbol: 'f', meaning: 'Jarak fokus lensa lup', unit: 'cm' },
    ],
    explanation: 'Karena s\' = -Sn, maka 1/s = 1/f - 1/(-Sn) = 1/f + 1/Sn. Perbesaran M = Sn/s = Sn(1/f + 1/Sn) = Sn/f + 1.',
    example: {
      problem: 'Pengamat bermata normal (Sn = 25 cm) menggunakan lup berfokus 5 cm dengan berakomodasi maksimum. Berapa perbesarannya?',
      calculation: 'M = (25 / 5) + 1 = 5 + 1 = 6 kali.',
      result: 'M = 6 kali.',
    },
    caution: 'Rumus ini menghasilkan perbesaran lebih besar (+1) dibanding tanpa akomodasi, namun mata cepat lelah.',
  },
  {
    id: 'lup-tanpa-akomodasi',
    category: 'Lup (Kaca Pembesar)',
    title: 'Perbesaran Lup: Mata Tidak Berakomodasi (Rileks)',
    formulaDisplay: 'M = Sn / f',
    condition: 'Mata rileks (tanpa akomodasi), benda diletakkan tepat di titik fokus lup (s = f), sehingga bayangan berada di tak terhingga (s\' = -∞).',
    symbols: [
      { symbol: 'M', meaning: 'Perbesaran sudut (anguler)', unit: 'kali' },
      { symbol: 'Sn', meaning: 'Titik dekat mata (standar normal = 25 cm)', unit: 'cm' },
      { symbol: 'f', meaning: 'Jarak fokus lensa lup', unit: 'cm' },
    ],
    explanation: 'Pengamatan paling nyaman untuk waktu lama karena otot siliaris mata tidak berkontraksi.',
    example: {
      problem: 'Lup berfokus 5 cm digunakan untuk mengamati serangga dengan mata tak berakomodasi (Sn = 25 cm).',
      calculation: 'M = 25 / 5 = 5 kali.',
      result: 'M = 5 kali.',
    },
    caution: 'Perhatikan bahwa letak benda harus tepat di titik fokus lup (s = f).',
  },
  {
    id: 'mikroskop-total',
    category: 'Mikroskop',
    title: 'Mikroskop: Perbesaran Total & Jarak Tabung',
    formulaDisplay: 'M_total = |M_ob| × M_ok    |    d = s\'_ob + s_ok',
    condition: 'Terdiri dari lensa objektif (fob kecil) dan lensa okuler (fok > fob). Objektif menghasilkan bayangan nyata, terbalik, diperbesar.',
    symbols: [
      { symbol: 'M_total', meaning: 'Perbesaran total mikroskop', unit: 'kali' },
      { symbol: 'M_ob', meaning: 'Perbesaran linear objektif = |s\'_ob / s_ob|', unit: 'kali' },
      { symbol: 'M_ok', meaning: 'Perbesaran sudut okuler (sebagai lup)', unit: 'kali' },
      { symbol: 'd', meaning: 'Jarak antara lensa objektif dan lensa okuler (panjang tabung)', unit: 'cm' },
      { symbol: 's\'_ob', meaning: 'Jarak bayangan yang dibentuk objektif', unit: 'cm' },
      { symbol: 's_ok', meaning: 'Jarak benda untuk lensa okuler', unit: 'cm' },
    ],
    explanation: 'Okuler berfungsi sebagai lup. Untuk mata tak berakomodasi: Mok = Sn/fok dan sok = fok, sehingga d = s\'_ob + fok. Untuk mata berakomodasi maksimum: Mok = (Sn/fok) + 1 dan sok = (fok × Sn)/(fok + Sn).',
    example: {
      problem: 'Mikroskop: fob = 1 cm, fok = 5 cm, preparat diletakkan 1,2 cm di depan objektif. Mata normal (Sn = 25 cm) tak berakomodasi.',
      calculation: '1/s\'_ob = 1/1 - 1/1,2 = (1,2 - 1)/1,2 = 0,2/1,2 = 1/6 ==> s\'_ob = 6 cm. Mob = 6 / 1,2 = 5 kali. Mok = 25 / 5 = 5 kali. M_total = 5 × 5 = 25 kali. d = 6 + 5 = 11 cm.',
      result: 'M_total = 25 kali, d = 11 cm.',
    },
    caution: 'Benda mikroskop selalu diletakkan di antara fob dan 2fob (Ruang II objektif) agar terbentuk bayangan nyata di Ruang III.',
  },
  {
    id: 'teropong-bintang',
    category: 'Teropong Bintang (Astronomis)',
    title: 'Teropong Bintang (Kepler)',
    formulaDisplay: 'M = f_ob / f_ok    |    d = f_ob + f_ok (Tanpa Akomodasi)',
    condition: 'Mengamati benda astronomi di tak terhingga. Kedua lensa adalah lensa cembung (+). Bayangan akhir terbalik.',
    symbols: [
      { symbol: 'M', meaning: 'Perbesaran sudut teropong', unit: 'kali' },
      { symbol: 'd', meaning: 'Panjang teropong (jarak objektif ke okuler)', unit: 'cm' },
      { symbol: 'f_ob', meaning: 'Jarak fokus lensa objektif (panjang)', unit: 'cm' },
      { symbol: 'f_ok', meaning: 'Jarak fokus lensa okuler (pendek)', unit: 'cm' },
    ],
    explanation: 'Pada mata tak berakomodasi, bayangan antara objektif jatuh tepat di fokus objektif (s\'_ob = fob) dan sekaligus menjadi titik fokus okuler (s_ok = fok). Bayangan akhir keluar berupa sinar sejajar ke mata.',
    example: {
      problem: 'Teropong bintang dengan fob = 120 cm dan fok = 6 cm digunakan tanpa akomodasi.',
      calculation: 'M = 120 / 6 = 20 kali. d = 120 + 6 = 126 cm.',
      result: 'Perbesaran 20 kali, panjang tabung 126 cm.',
    },
    caution: 'Jika mata berakomodasi maksimum, bayangan akhir di s\'_ok = -Sn, sehingga s_ok < fok dan d = fob + s_ok.',
  },
  {
    id: 'teropong-panggung',
    category: 'Teropong Panggung (Galilei)',
    title: 'Teropong Panggung / Galilei',
    formulaDisplay: 'M = f_ob / |f_ok|    |    d = f_ob - |f_ok| (Tanpa Akomodasi)',
    condition: 'Lensa objektif cembung (+), lensa okuler cekung (-). Menghasilkan bayangan akhir TEGAK tanpa lensa pembalik!',
    symbols: [
      { symbol: 'M', meaning: 'Perbesaran sudut teropong', unit: 'kali' },
      { symbol: 'd', meaning: 'Panjang teropong panggung', unit: 'cm' },
      { symbol: 'f_ob', meaning: 'Jarak fokus lensa objektif (positif)', unit: 'cm' },
      { symbol: 'f_ok', meaning: 'Jarak fokus lensa okuler (negatif)', unit: 'cm' },
    ],
    explanation: 'Karena okuler merupakan lensa cekung divergen, panjang tabung menjadi d = fob + fok = fob - |fok|. Ini membuat teropong panggung sangat ringkas dan cocok untuk opera/panggung.',
    example: {
      problem: 'Teropong Galilei memiliki fob = +30 cm dan okuler cekung fok = -5 cm. Berapa perbesaran dan panjang tabungnya?',
      calculation: 'M = 30 / |-5| = 6 kali. d = 30 - 5 = 25 cm.',
      result: 'M = 6 kali, d = 25 cm (bayangan tegak).',
    },
    caution: 'Ingat bahwa fokus okuler teropong panggung bernilai negatif! Jangan menjumlahkannya seperti teropong bintang.',
  },
  {
    id: 'teropong-bumi',
    category: 'Teropong Bumi (Medan)',
    title: 'Teropong Bumi / Medan',
    formulaDisplay: 'M = f_ob / f_ok    |    d = f_ob + 4f_p + f_ok (Tanpa Akomodasi)',
    condition: 'Terdiri dari 3 lensa cembung (+): Objektif, Lensa Pembalik (f_p), dan Okuler. Bayangan akhir TEGAK.',
    symbols: [
      { symbol: 'M', meaning: 'Perbesaran sudut teropong bumi', unit: 'kali' },
      { symbol: 'd', meaning: 'Panjang teropong bumi', unit: 'cm' },
      { symbol: 'f_ob', meaning: 'Fokus lensa objektif', unit: 'cm' },
      { symbol: 'f_p', meaning: 'Fokus lensa pembalik', unit: 'cm' },
      { symbol: 'f_ok', meaning: 'Fokus lensa okuler', unit: 'cm' },
    ],
    explanation: 'Lensa pembalik dipasang dengan benda pada jarak 2fp di depannya, sehingga bayangan terbentuk pada jarak 2fp di belakangnya (perbesaran linear = 1, hanya membalik orientasi tanpa mengubah ukuran). Jarak tambahan pada tabung adalah 2fp + 2fp = 4fp.',
    example: {
      problem: 'Teropong bumi dengan fob = 50 cm, fp = 5 cm, dan fok = 10 cm digunakan tanpa akomodasi.',
      calculation: 'M = 50 / 10 = 5 kali. d = 50 + 4(5) + 10 = 50 + 20 + 10 = 80 cm.',
      result: 'M = 5 kali, d = 80 cm (bayangan tegak).',
    },
    caution: 'Lensa pembalik TIDAK memengaruhi perbesaran sudut (M tetap fob/fok), hanya menambah panjang tabung sebesar 4fp.',
  },
  {
    id: 'miopi',
    category: 'Cacat Mata',
    title: 'Miopi (Rabun Jauh) — Lensa Cekung (-)',
    formulaDisplay: 'P = -1 / PR (PR dalam meter)    atau    P = -100 / PR (PR dalam cm)',
    condition: 'Bayangan jatuh di depan retina karena bola mata terlalu lonjong atau kornea terlalu cembung. Titik jauh PR < ∞.',
    symbols: [
      { symbol: 'P', meaning: 'Kekuatan lensa kacamata yang dibutuhkan', unit: 'Dioptri (D)' },
      { symbol: 'PR', meaning: 'Punctum Remotum (titik jauh mata penderita)', unit: 'cm atau m' },
    ],
    explanation: 'Benda jauh (s = ∞) harus dibentuk bayangan mayanya tepat di titik jauh penderita (s\' = -PR). Dengan 1/f = 1/∞ + 1/(-PR) = -1/PR, maka f = -PR.',
    example: {
      problem: 'Seseorang hanya dapat melihat jelas paling jauh pada jarak 200 cm (2 meter). Tentukan kekuatan kacamata yang diperlukannya!',
      calculation: 's = ∞, s\' = -200 cm. P = -100 / 200 = -0,5 Dioptri.',
      result: 'P = -0,5 Dioptri (lensa cekung / negatif).',
    },
    caution: 'Kekuatan lensa miopi SELALU BERTANDA NEGATIF (-).',
  },
  {
    id: 'hipermetropi',
    category: 'Cacat Mata',
    title: 'Hipermetropi (Rabun Dekat) — Lensa Cembung (+)',
    formulaDisplay: 'P = (100 / Sn) - (100 / PP)    dengan Sn = jarak baca normal (25 cm)',
    condition: 'Bayangan jatuh di belakang retina karena bola mata terlalu pendek. Titik dekat PP > 25 cm.',
    symbols: [
      { symbol: 'P', meaning: 'Kekuatan lensa kacamata konvergen', unit: 'Dioptri (D)' },
      { symbol: 'Sn', meaning: 'Jarak baca normal standar (umumnya 25 cm)', unit: 'cm' },
      { symbol: 'PP', meaning: 'Punctum Proximum (titik dekat mata penderita)', unit: 'cm' },
    ],
    explanation: 'Benda baca pada jarak normal (s = Sn = 25 cm) harus dibentuk bayangan mayanya tepat di titik dekat penderita (s\' = -PP). Sehingga P = 100/s + 100/s\' = 100/Sn - 100/PP.',
    example: {
      problem: 'Titik dekat seseorang adalah 50 cm. Berapa kekuatan kacamata agar ia dapat membaca pada jarak 25 cm?',
      calculation: 'P = 100/25 - 100/50 = 4 - 2 = +2 Dioptri.',
      result: 'P = +2 Dioptri (lensa cembung / positif).',
    },
    caution: 'Kekuatan lensa hipermetropi SELALU BERTANDA POSITIF (+). Jika jarak baca yang diinginkan bukan 25 cm, sesuaikan Sn.',
  },
  {
    id: 'presbiopi',
    category: 'Cacat Mata',
    title: 'Presbiopi (Mata Tua) & Kacamata Bifokal',
    formulaDisplay: 'Lensa Jauh: P_jauh = -100/PR    |    Lensa Dekat: P_dekat = 100/Sn - 100/PP',
    condition: 'Penurunan elastisitas lensa mata akibat penuaan: titik dekat menjauh (PP > 25 cm) DAN titik jauh mendekat (PR < ∞).',
    symbols: [
      { symbol: 'P_jauh', meaning: 'Bagian atas lensa bifokal untuk melihat jauh (negatif)', unit: 'Dioptri (D)' },
      { symbol: 'P_dekat', meaning: 'Bagian bawah lensa bifokal untuk membaca dekat (positif)', unit: 'Dioptri (D)' },
      { symbol: 'PP', meaning: 'Titik dekat mata presbiop', unit: 'cm' },
      { symbol: 'PR', meaning: 'Titik jauh mata presbiop', unit: 'cm' },
    ],
    explanation: 'Presbiop memerlukan kacamata bifokal (rangkap). Bagian atas untuk melihat objek jauh, bagian bawah untuk membaca buku pada jarak standar 25 cm.',
    example: {
      problem: 'Kakek memiliki titik dekat 100 cm dan titik jauh 250 cm. Berapakah ukuran kacamata bifokalnya?',
      calculation: 'Jauh: P = -100 / 250 = -0,4 Dioptri. Dekat: P = 100/25 - 100/100 = 4 - 1 = +3 Dioptri.',
      result: 'Kacamata bifokal: Lensa atas -0,4 D dan lensa bawah +3,0 D.',
    },
    caution: 'Presbiopi bukan sekadar hipermetropi, melainkan melemahnya daya akomodasi kedua arah (dekat maupun jauh).',
  },
];
