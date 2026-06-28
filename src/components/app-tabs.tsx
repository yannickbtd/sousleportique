import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * Barre d'onglets native — les 5 piliers de l'app.
 * Icônes : SF Symbols (iOS) + Material (Android) pour une couverture cross-platform
 * sans assets PNG.
 */
export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.accentSoft}
      iconColor={{ default: colors.textSecondary, selected: colors.accent }}
      labelStyle={{ selected: { color: colors.accent } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Accueil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="apprendre">
        <NativeTabs.Trigger.Label>Apprendre</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="book" md="menu_book" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pratiquer">
        <NativeTabs.Trigger.Label>Pratiquer</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="leaf" md="self_improvement" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="mediter">
        <NativeTabs.Trigger.Label>Méditer</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="moon.stars" md="nights_stay" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profil">
        <NativeTabs.Trigger.Label>Profil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
