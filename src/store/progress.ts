/**
 * Suivi de progression — persisté localement (AsyncStorage, compatible Expo Go).
 * Migrera vers SQLite si le volume le justifie (cf. architecture).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getModule } from '@/content/modules';

function lessonKey(moduleId: string, lessonId: string) {
  return `${moduleId}:${lessonId}`;
}

type ProgressState = {
  completedLessons: Record<string, true>;
  quizScores: Record<string, number>; // moduleId -> meilleur score (0..1)
  markLessonComplete: (moduleId: string, lessonId: string) => void;
  setQuizScore: (moduleId: string, score: number) => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: {},
      quizScores: {},
      markLessonComplete: (moduleId, lessonId) =>
        set((s) => ({
          completedLessons: { ...s.completedLessons, [lessonKey(moduleId, lessonId)]: true },
        })),
      setQuizScore: (moduleId, score) =>
        set((s) => ({
          quizScores: {
            ...s.quizScores,
            [moduleId]: Math.max(score, s.quizScores[moduleId] ?? 0),
          },
        })),
      reset: () => set({ completedLessons: {}, quizScores: {} }),
    }),
    {
      name: 'slp-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/** Une leçon est-elle terminée ? */
export function useIsLessonComplete(moduleId: string, lessonId: string): boolean {
  return useProgress((s) => Boolean(s.completedLessons[lessonKey(moduleId, lessonId)]));
}

/** Progression d'un module : leçons faites / total + ratio (0..1). */
export function useModuleProgress(moduleId: string): { done: number; total: number; ratio: number } {
  return useProgress((s) => {
    const mod = getModule(moduleId);
    const total = mod?.lessons.length ?? 0;
    const done = mod
      ? mod.lessons.filter((l) => s.completedLessons[lessonKey(moduleId, l.id)]).length
      : 0;
    return { done, total, ratio: total === 0 ? 0 : done / total };
  });
}

/** Totaux pour l'écran Profil. */
export function useTotals(): { lessons: number } {
  return useProgress((s) => ({ lessons: Object.keys(s.completedLessons).length }));
}
