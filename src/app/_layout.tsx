import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { Onboarding } from '@/components/onboarding';
import { syncReminders } from '@/lib/notifications';
import { useJournal } from '@/store/journal';
import { useSettings } from '@/store/settings';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loadJournal = useJournal((s) => s.load);
  const hydrated = useSettings((s) => s.hydrated);
  const onboarded = useSettings((s) => s.onboarded);
  const reminders = useSettings((s) => s.reminders);

  // Déchiffre et charge le journal en mémoire au démarrage.
  useEffect(() => {
    loadJournal();
  }, [loadJournal]);

  // Reprogramme les rappels quand ils changent (une fois l'onboarding fait).
  useEffect(() => {
    if (onboarded) {
      syncReminders(reminders).catch(() => {
        /* notifications indisponibles (Expo Go) */
      });
    }
  }, [onboarded, reminders]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {!hydrated ? null : onboarded ? <AppTabs /> : <Onboarding />}
    </ThemeProvider>
  );
}
