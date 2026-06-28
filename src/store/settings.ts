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

export type Plan = 'mensuel' | 'annuel';

type SettingsState = {
  hydrated: boolean;
  onboarded: boolean;
  objectif?: string;
  analytics: boolean;
  reminders: Reminders;
  // Abonnement (mock pour l'instant — sera piloté par RevenueCat plus tard).
  premiumActive: boolean;
  premiumPlan?: Plan;
  premiumSince?: number;
  setHydrated: () => void;
  completeOnboarding: (data: { objectif?: string; analytics: boolean; reminders: Reminders }) => void;
  setReminders: (r: Reminders) => void;
  setAnalytics: (v: boolean) => void;
  setPremium: (active: boolean, plan?: Plan) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      hydrated: false,
      onboarded: false,
      objectif: undefined,
      analytics: false,
      reminders: DEFAULT_REMINDERS,
      premiumActive: false,
      premiumPlan: undefined,
      premiumSince: undefined,
      setHydrated: () => set({ hydrated: true }),
      completeOnboarding: ({ objectif, analytics, reminders }) =>
        set({ onboarded: true, objectif, analytics, reminders }),
      setReminders: (reminders) => set({ reminders }),
      setAnalytics: (analytics) => set({ analytics }),
      setPremium: (active, plan) =>
        set({
          premiumActive: active,
          premiumPlan: active ? plan : undefined,
          premiumSince: active ? Date.now() : undefined,
        }),
    }),
    {
      name: 'slp.settings.v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        onboarded: s.onboarded,
        objectif: s.objectif,
        analytics: s.analytics,
        reminders: s.reminders,
        premiumActive: s.premiumActive,
        premiumPlan: s.premiumPlan,
        premiumSince: s.premiumSince,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

/** L'utilisateur est-il abonné Premium ? */
export function usePremium(): boolean {
  return useSettings((s) => s.premiumActive);
}
