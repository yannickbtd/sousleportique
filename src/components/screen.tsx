import { type ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  /** Titre principal (rendu en serif, ton « portique »). */
  title: string;
  /** Sous-titre / accroche optionnelle. */
  subtitle?: string;
  /** Élément optionnel rendu sous l'en-tête (ex. citation du jour). */
  intro?: ReactNode;
  children: ReactNode;
};

/**
 * Coquille d'écran réutilisable : safe area, scroll, largeur max, en-tête « portique ».
 * Toutes les pages des piliers s'appuient dessus pour une mise en page cohérente.
 */
export function Screen({ title, subtitle, intro, children }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Platform.OS === 'web' ? Spacing.six : insets.top + Spacing.three,
          paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
        },
      ]}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: theme.text, fontFamily: Fonts.serif }]}>
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
        {intro}
        <View style={styles.body}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  inner: { width: '100%', maxWidth: MaxContentWidth, gap: Spacing.four },
  header: { gap: Spacing.one },
  title: { fontSize: 34, lineHeight: 40, fontWeight: '600' },
  subtitle: { fontSize: 16, lineHeight: 22 },
  body: { gap: Spacing.three },
});
