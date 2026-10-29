import { QuestionData } from '../types';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';

export const ALL_QUESTIONS: QuestionData[] = [...QUESTIONS_PART_1, ...QUESTIONS_PART_2];

// Validation checks for question set conformity
export function validateQuestionDataset(questions: QuestionData[] = ALL_QUESTIONS) {
  const total = questions.length;
  const alatOptikCount = questions.filter((q) => q.category === 'Alat Optik').length;
  const cacatMataCount = questions.filter((q) => q.category === 'Cacat Mata').length;

  const pgCount = questions.filter((q) => q.type === 'pilihan_ganda').length;
  const pgkCount = questions.filter((q) => q.type === 'pilihan_ganda_kompleks').length;
  const bsCount = questions.filter((q) => q.type === 'benar_salah').length;

  const fondasiCount = questions.filter((q) => q.difficulty === 'Fondasi').length;
  const menengahCount = questions.filter((q) => q.difficulty === 'Menengah').length;
  const hotsCount = questions.filter((q) => q.difficulty === 'HOTS').length;

  const topicCounts: Record<string, number> = {};
  questions.forEach((q) => {
    topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
  });

  return {
    total,
    isValidTotal: total === 30,
    alatOptikCount,
    cacatMataCount,
    isValidCategory: alatOptikCount === 22 && cacatMataCount === 8,
    pgCount,
    pgkCount,
    bsCount,
    isValidTypes: pgCount === 10 && pgkCount === 10 && bsCount === 10,
    fondasiCount,
    menengahCount,
    hotsCount,
    isValidDifficulty: fondasiCount === 6 && menengahCount === 12 && hotsCount === 12,
    topicCounts,
  };
}
