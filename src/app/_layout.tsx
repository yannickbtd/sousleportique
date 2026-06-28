import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useJournal } from '@/store/journal';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const loadJournal = useJournal((s) => s.load);

  // Déchiffre et charge le journal en mémoire au démarrage.
  useEffect(() => {
    loadJournal();
  }, [loadJournal]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
