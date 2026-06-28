import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CardProps = {
  title: string;
  subtitle?: string;
  /** Badge optionnel en haut à droite (ex. « Premium », « Gratuit »). */
  badge?: string;
  /** Icône SF/emoji simple à gauche du titre (placeholder Sprint 1). */
  glyph?: string;
  /** Affiche un cadenas premium. */
  locked?: boolean;
  footer?: ReactNode;
  onPress?: () => void;
};

/**
 * Carte de contenu réutilisable (leçon, exercice, méditation, rituel).
 */
export function Card({ title, subtitle, badge, glyph, locked, footer, onPress }: CardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        pressed && onPress ? styles.pressed : null,
      ]}>
      <View style={styles.row}>
        {glyph ? <ThemedText style={styles.glyph}>{glyph}</ThemedText> : null}
        <View style={styles.texts}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.title} numberOfLines={2}>
              {title}
            </ThemedText>
            {locked ? <ThemedText style={[styles.lock, { color: theme.accent }]}>🔒</ThemedText> : null}
          </View>
          {subtitle ? (
            <ThemedText themeColor="textSecondary" type="small">
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
        {badge ? (
          <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
            <ThemedText style={[styles.badgeText, { color: theme.accent }]}>{badge}</ThemedText>
          </View>
        ) : null}
      </View>
      {footer}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  pressed: { opacity: 0.7 },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  glyph: { fontSize: 24 },
  texts: { flex: 1, gap: Spacing.half },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  title: { fontSize: 17, fontWeight: '600', flexShrink: 1 },
  lock: { fontSize: 12 },
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
  },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
});
