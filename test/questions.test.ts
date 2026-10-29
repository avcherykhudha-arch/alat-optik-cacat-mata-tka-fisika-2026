import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALL_QUESTIONS, validateQuestionDataset } from '../src/data/questions.ts';

test('Validasi Mutu Bank Soal Fisika Jenius (Section 18)', () => {
  const stats = validateQuestionDataset(ALL_QUESTIONS);

  // 1. Tepat 30 soal
  assert.equal(stats.total, 30, 'Total soal harus tepat 30');

  // 2. Komposisi 22 Alat Optik dan 8 Cacat Mata
  assert.equal(stats.alatOptikCount, 22, 'Alat Optik harus 22 soal');
  assert.equal(stats.cacatMataCount, 8, 'Cacat Mata harus 8 soal');

  // 3. Distribusi Tipe Soal: 10 PG, 10 PGK, 10 Benar-Salah
  assert.equal(stats.pgCount, 10, 'Pilihan Ganda harus 10 soal');
  assert.equal(stats.pgkCount, 10, 'Pilihan Ganda Kompleks harus 10 soal');
  assert.equal(stats.bsCount, 10, 'Benar-Salah harus 10 soal');

  // 4. Tingkat Kesulitan: 6 Fondasi, 12 Menengah, 12 HOTS
  assert.equal(stats.fondasiCount, 6, 'Fondasi harus 6 soal');
  assert.equal(stats.menengahCount, 12, 'Menengah harus 12 soal');
  assert.equal(stats.hotsCount, 12, 'HOTS harus 12 soal');

  // 5. Perincian Subtopik
  assert.equal(stats.topicCounts['Lup'], 4, 'Lup harus 4 soal');
  assert.equal(stats.topicCounts['Mikroskop'], 5, 'Mikroskop harus 5 soal');
  assert.equal(stats.topicCounts['Teropong Bintang'], 4, 'Teropong Bintang harus 4 soal');
  assert.equal(stats.topicCounts['Teropong Panggung'], 3, 'Teropong Panggung harus 3 soal');
  assert.equal(stats.topicCounts['Teropong Bumi'], 3, 'Teropong Bumi harus 3 soal');
  assert.equal(stats.topicCounts['Analisis & Konteks Nyata'], 3, 'Analisis & Konteks Nyata harus 3 soal');
  assert.equal(stats.topicCounts['Miopi'], 3, 'Miopi harus 3 soal');
  assert.equal(stats.topicCounts['Hipermetropi'], 3, 'Hipermetropi harus 3 soal');
  assert.equal(stats.topicCounts['Presbiopi'], 2, 'Presbiopi harus 2 soal');

  // 6. Validasi Kelengkapan Setiap Soal
  ALL_QUESTIONS.forEach((q, idx) => {
    assert.equal(q.number, idx + 1, `Nomor soal harus berurutan ${idx + 1}`);
    assert.ok(q.stimulus.title, `Soal ${q.number} harus punya judul stimulus`);
    assert.ok(q.stimulus.text, `Soal ${q.number} harus punya teks stimulus`);
    assert.ok(q.question, `Soal ${q.number} harus punya pertanyaan`);
    assert.ok(q.known.length > 0, `Soal ${q.number} harus punya Diketahui`);
    assert.ok(q.asked, `Soal ${q.number} harus punya Ditanya`);
    assert.ok(q.keyFormula.formula, `Soal ${q.number} harus punya Rumus Kunci`);
    assert.ok(q.solution.steps.length >= 3, `Soal ${q.number} harus punya pembahasan minimal 3 langkah`);
    assert.ok(q.quickTrick.trick, `Soal ${q.number} harus punya Cara Cepat`);
    assert.ok(q.miniReflection.prompt, `Soal ${q.number} harus punya Refleksi Mini`);
    assert.ok(q.narration.stimulusAndQuestion, `Soal ${q.number} harus punya narasi stimulus & pertanyaan`);

    if (q.type === 'pilihan_ganda') {
      assert.ok(q.options && q.options.length === 5, `Soal PG ${q.number} harus punya 5 opsi (A-E)`);
      assert.ok(q.correctSingleAnswer && ['A', 'B', 'C', 'D', 'E'].includes(q.correctSingleAnswer));
    } else if (q.type === 'pilihan_ganda_kompleks') {
      assert.ok(q.options && q.options.length === 5, `Soal PGK ${q.number} harus punya 5 opsi (A-E)`);
      assert.ok(
        q.correctComplexAnswers &&
        q.correctComplexAnswers.length >= 2 &&
        q.correctComplexAnswers.length <= 4,
        `Soal PGK ${q.number} harus punya 2-4 jawaban benar (minimal 2 benar, minimal 1 salah)`
      );
    } else if (q.type === 'benar_salah') {
      assert.ok(q.statements && q.statements.length === 3, `Soal Benar-Salah ${q.number} harus punya tepat 3 pernyataan`);
      q.statements.forEach((s) => {
        assert.equal(typeof s.isCorrect, 'boolean', `Pernyataan ${s.id} pada soal ${q.number} harus memiliki nilai boolean isCorrect`);
        assert.ok(s.explanation, `Pernyataan ${s.id} pada soal ${q.number} harus memiliki penjelasan`);
      });
    }
  });

  console.log('✅ SELURUH 30 SOAL LOLOS VALIDASI MUTU PERSYARATAN DENGAN SEMPURNA!');
});
