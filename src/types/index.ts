export type QuestionType = 'pilihan_ganda' | 'pilihan_ganda_kompleks' | 'benar_salah';

export type QuestionTopic =
  | 'Lup'
  | 'Mikroskop'
  | 'Teropong Bintang'
  | 'Teropong Panggung'
  | 'Teropong Bumi'
  | 'Analisis & Konteks Nyata'
  | 'Miopi'
  | 'Hipermetropi'
  | 'Presbiopi';

export type DifficultyLevel = 'Fondasi' | 'Menengah' | 'HOTS';

export interface MultipleChoiceOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  isCorrect?: boolean;
}

export interface StatementItem {
  id: string;
  statement: string;
  isCorrect: boolean; // true = BENAR, false = SALAH
  explanation: string;
}

export type DiagramType =
  | 'lup_mata_berakomodasi'
  | 'lup_mata_tak_berakomodasi'
  | 'mikroskop_skema'
  | 'mikroskop_akomodasi_maks'
  | 'teropong_bintang_skema'
  | 'teropong_panggung_galilei'
  | 'teropong_bumi_pembalik'
  | 'cacat_mata_miopi'
  | 'cacat_mata_hipermetropi'
  | 'cacat_mata_presbiopi'
  | 'grafik_perbesaran_lup'
  | 'tabel_spesifikasi_alat'
  | 'diagram_perbandingan_teropong';

export interface QuestionData {
  id: number;
  number: number;
  topic: QuestionTopic;
  category: 'Alat Optik' | 'Cacat Mata';
  type: QuestionType;
  difficulty: DifficultyLevel;
  stimulus: {
    title: string;
    text: string;
    context: string;
    diagramType?: DiagramType;
    tableData?: {
      headers: string[];
      rows: (string | number)[][];
    };
  };
  question: string;
  known: string[]; // Apa yang diketahui
  asked: string; // Apa yang ditanya
  keyFormula: {
    formula: string;
    symbols: { symbol: string; meaning: string; unit: string }[];
    notes: string;
    accommodationCondition?: 'Akomodasi Maksimum' | 'Tanpa Akomodasi' | 'Umum';
  };
  options?: MultipleChoiceOption[]; // for pilihan_ganda & pilihan_ganda_kompleks
  correctSingleAnswer?: 'A' | 'B' | 'C' | 'D' | 'E'; // for pilihan_ganda
  correctComplexAnswers?: ('A' | 'B' | 'C' | 'D' | 'E')[]; // for pilihan_ganda_kompleks (min 2 correct, min 1 wrong)
  complexExplanation?: Record<string, string>; // explanation per option A-E
  statements?: StatementItem[]; // for benar_salah (3 statements)
  solution: {
    steps: string[];
    summary: string;
  };
  quickTrick: {
    title: string;
    trick: string;
    limitation: string;
  };
  miniReflection: {
    prompt: string;
    conceptTakeaway: string;
  };
  narration: {
    intro: string;
    stimulusAndQuestion: string;
    hint: string;
    correctFeedback: string;
    incorrectFeedback: string;
    solutionSpeech: string;
    quickTrickSpeech: string;
    formulaSpeech: string;
  };
}

export interface UserSingleAnswer {
  type: 'pilihan_ganda';
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  score: number; // 0 - 100
  isSubmitted: boolean;
}

export interface UserComplexAnswer {
  type: 'pilihan_ganda_kompleks';
  selectedOptions: ('A' | 'B' | 'C' | 'D' | 'E')[];
  score: number; // 0 - 100 (partial)
  isSubmitted: boolean;
}

export interface UserTrueFalseAnswer {
  type: 'benar_salah';
  decisions: Record<string, boolean | null>; // statementId -> true (Benar) or false (Salah)
  score: number; // 0 - 100 (partial)
  isSubmitted: boolean;
}

export type UserAnswer = UserSingleAnswer | UserComplexAnswer | UserTrueFalseAnswer;

export interface VoiceSettings {
  enabled: boolean;
  rate: number; // 0.8, 1.0, 1.25
  pitch: number; // 1.0
  volume: number; // 1.0
  autoPlay: boolean;
  voiceURI: string | null;
}

export interface AppProgress {
  answers: Record<number, UserAnswer>;
  viewedSolutions: Record<number, boolean>;
  currentQuestionIndex: number;
  isCompleted: boolean;
  lastUpdated: string;
}
