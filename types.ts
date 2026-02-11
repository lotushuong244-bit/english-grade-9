export enum LessonType {
  VOCABULARY = 'Vocabulary',
  PRONUNCIATION = 'Pronunciation',
  GRAMMAR = 'Grammar',
  LISTENING = 'Listening',
  SPEAKING = 'Speaking',
  QUIZ = 'Quiz'
}

export interface VocabularyWord {
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  ipa?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ListeningContent {
  audioScript: string;
  title: string;
  questions: Question[];
}

export interface SpeakingTask {
  topic: string;
  description: string;
  sampleResponse?: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  content?: {
    vocabulary?: VocabularyWord[];
    grammarRule?: string;
    grammarExamples?: string[];
    listening?: ListeningContent;
    speaking?: SpeakingTask;
    quiz?: Question[];
    pronunciationNote?: string;
  };
  xpReward: number;
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface UserProgress {
  totalXP: number;
  completedLessons: string[]; // Lesson IDs
  completedUnits: string[]; // Unit IDs
  streakDays: number;
  badges: string[];
}

export interface UserProfile {
  name: string;
  className: string;
  avatar?: string;
}
