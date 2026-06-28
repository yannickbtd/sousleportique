/**
 * Suivi de progression — persisté localement (AsyncStorage, compatible Expo Go).
 * Migrera vers SQLite si le volume le justifie (cf. architecture).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getModule } from '@/content/modules';
import { dayKey } from '@/lib/date';

function lessonKey(moduleId: string, lessonId: string) {
  return `${moduleId}:${lessonId}`;
}

type ProgressState = {
  completedLessons: Record<string, true>;
  quizScores: Record<string, number>; // moduleId -> meilleur score (0..1)
  meditationsDone: Record<string, true>; // meditationId -> true (au moins une fois)
  meditationSessions: number; // nombre total de séances de méditation
  activeDays: Record<string, true>; // jours avec au moins une activité (clé AAAA-MM-JJ)
  recordActivity: () => void;
  markLessonComplete: (moduleId: string, lessonId: string) => void;
  setQuizScore: (moduleId: string, score: number) => void;
  markMeditationDone: (meditationId: string) => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: {},
      quizScores: {},
      meditationsDone: {},
      meditationSessions: 0,
      activeDays: {},
      recordActivity: () =>
        set((s) => {
          const k = dayKey();
          if (s.activeDays[k]) return s;
          return { activeDays: { ...s.activeDays, [k]: true } };
        }),
      markLessonComplete: (moduleId, lessonId) =>
        set((s) => ({
          completedLessons: { ...s.completedLessons, [lessonKey(moduleId, lessonId)]: true },
          activeDays: { ...s.activeDays, [dayKey()]: true },
        })),
      setQuizScore: (moduleId, score) =>
        set((s) => ({
          quizScores: {
            ...s.quizScores,
            [moduleId]: Math.max(score, s.quizScores[moduleId] ?? 0),
          },
          activeDays: { ...s.activeDays, [dayKey()]: true },
        })),
      markMeditationDone: (meditationId) =>
        set((s) => ({
          meditationsDone: { ...s.meditationsDone, [meditationId]: true },
          meditationSessions: s.meditationSessions + 1,
          activeDays: { ...s.activeDays, [dayKey()]: true },
        })),
      reset: () =>
        set({
          completedLessons: {},
          quizScores: {},
          meditationsDone: {},
          meditationSessions: 0,
          activeDays: {},
        }),
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
export function useTotals(): { lessons: number; meditations: number } {
  return useProgress((s) => ({
    lessons: Object.keys(s.completedLessons).length,
    meditations: s.meditationSessions,
  }));
}

/** Série de jours consécutifs d'activité, se terminant aujourd'hui ou hier. */
export function useStreak(): number {
  return useProgress((s) => {
    const has = (d: Date) => Boolean(s.activeDays[dayKey(d)]);
    const cursor = new Date();
    if (!has(cursor)) {
      cursor.setDate(cursor.getDate() - 1);
      if (!has(cursor)) return 0;
    }
    let streak = 0;
    while (has(cursor)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  });
}
