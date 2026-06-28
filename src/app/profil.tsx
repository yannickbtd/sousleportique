import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTotals } from '@/store/progress';

function Stat({ value, label }: { value: string; label: string }) {
  const theme = useTheme();
  return (
    <View style={styles.stat}>
      <ThemedText style={[styles.statValue, { color: theme.accent }]}>{value}</ThemedText>
      <ThemedText themeColor="textSecondary" type="small">
        {label}
      </ThemedText>
    </View>
  );
}

export default function ProfilScreen() {
  const theme = useTheme();
  const { lessons, meditations } = useTotals();

  return (
    <Screen title="Profil" subtitle="Ta progression et tes réglages.">
      <View
        style={[styles.stats, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <Stat value="0" label="Série (jours)" />
        <Stat value={String(lessons)} label="Leçons" />
        <Stat value={String(meditations)} label="Méditations" />
      </View>

      <Card
        glyph="✦"
        title="Passer à Premium"
        subtitle="Toutes les méditations et les exercices avancés. Essai gratuit 7 jours."
        badge="Découvrir"
      />

      <ThemedText style={styles.sectionTitle}>Réglages</ThemedText>
      <Card glyph="🔔" title="Rappels" subtitle="Notifications du matin et du soir" />
      <Card glyph="🎨" title="Apparence" subtitle="Thème clair / sombre" />
      <Card glyph="🔒" title="Confidentialité" subtitle="Données & journal" />
      <Card glyph="📖" title="Sources & bibliographie" subtitle="Hadot, Robertson, StoaGallica…" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.four,
  },
  stat: { alignItems: 'center', gap: Spacing.half },
  statValue: { fontSize: 26, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: Spacing.two },
});
