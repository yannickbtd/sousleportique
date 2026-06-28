/**
 * Préférences utilisateur — persistées (AsyncStorage). Pilote l'onboarding,
 * les rappels (notifications) et le consentement analytics (RGPD).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Reminders = {
  matin: boolean;
  soir: boolean;
  matinTime: string; // "HH:MM"
  soirTime: string; // "HH:MM"
};

export const DEFAULT_REMINDERS: Reminders = {
  matin: true,
  soir: true,
  matinTime: '07:30',
  soirTime: '21:00',
};

type SettingsState = {
  hydrated: boolean;
  onboarded: boolean;
  objectif?: string;
  analytics: boolean;
  reminders: Reminders;
  setHydrated: () => void;
  completeOnboarding: (data: { objectif?: string; analytics: boolean; reminders: Reminders }) => void;
  setReminders: (r: Reminders) => void;
  setAnalytics: (v: boolean) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      hydrated: false,
      onboarded: false,
      objectif: undefined,
      analytics: false,
      reminders: DEFAULT_REMINDERS,
      setHydrated: () => set({ hydrated: true }),
      completeOnboarding: ({ objectif, analytics, reminders }) =>
        set({ onboarded: true, objectif, analytics, reminders }),
      setReminders: (reminders) => set({ reminders }),
      setAnalytics: (analytics) => set({ analytics }),
    }),
    {
      name: 'slp.settings.v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        onboarded: s.onboarded,
        objectif: s.objectif,
        analytics: s.analytics,
        reminders: s.reminders,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
