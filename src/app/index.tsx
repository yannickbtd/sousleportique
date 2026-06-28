import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { citationDuJour } from '@/content/citations';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function salutation(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Bonjour';
  if (h < 18) return 'Bon après-midi';
  return 'Bonsoir';
}

/** Rituel suggéré selon l'heure (matin avant 12h, sinon soir). */
function rituelDuMoment(date = new Date()) {
  return date.getHours() < 14
    ? {
        glyph: '🌅',
        title: 'Rituel du matin',
        subtitle: 'Préparer la journée : anticiper les obstacles, fixer une intention vertueuse.',
      }
    : {
        glyph: '🌙',
        title: 'Rituel du soir',
        subtitle: "Examen de conscience : qu'ai-je bien fait ? que puis-je corriger demain ?",
      };
}

export default function AccueilScreen() {
  const theme = useTheme();
  const citation = citationDuJour();
  const rituel = rituelDuMoment();

  return (
    <Screen
      title="Sous le portique"
      subtitle={`${salutation()} — un pas de plus vers la sagesse.`}
      intro={
        <View
          style={[
            styles.citation,
            { backgroundColor: theme.accentSoft, borderColor: theme.border },
          ]}>
          <ThemedText style={styles.citationLabel} themeColor="textSecondary">
            CITATION DU JOUR
          </ThemedText>
          <ThemedText style={[styles.citationText, { fontFamily: Fonts.serif, color: theme.text }]}>
            « {citation.texte} »
          </ThemedText>
          <ThemedText themeColor="textSecondary" type="small">
            — {citation.auteur}, {citation.oeuvre} ({citation.ref})
          </ThemedText>
        </View>
      }>
      <ThemedText style={styles.sectionTitle}>Aujourd&apos;hui</ThemedText>
      <Card glyph={rituel.glyph} title={rituel.title} subtitle={rituel.subtitle} badge="Commencer" />

      <Card
        glyph="📿"
        title="Méditation guidée du jour"
        subtitle="Vue d'en haut — 5 min"
        badge="Premium"
        locked
      />

      <View style={styles.streak}>
        <ThemedText themeColor="textSecondary" type="small">
          Série en cours
        </ThemedText>
        <ThemedText style={[styles.streakValue, { color: theme.accent }]}>0 jour</ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          Commence un rituel pour démarrer ta série.
        </ThemedText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  citation: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  citationLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  citationText: { fontSize: 20, lineHeight: 28, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  streak: {
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.four,
  },
  streakValue: { fontSize: 28, fontWeight: '700' },
});
