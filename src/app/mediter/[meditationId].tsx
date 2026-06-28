import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Breathing } from '@/components/breathing';
import { Button } from '@/components/button';
import { MeditationPlayer } from '@/components/meditation-player';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AUDIO_SOURCES, getMeditation } from '@/content/meditations';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function minutesFromLabel(label: string): number {
  const n = parseInt(label, 10);
  return Number.isFinite(n) && n > 0 ? n : 5;
}

export default function MeditationScreen() {
  const { meditationId } = useLocalSearchParams<{ meditationId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const med = getMeditation(meditationId);

  if (!med) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Méditation' }} />
        <ThemedText>Méditation introuvable.</ThemedText>
      </ContentScroll>
    );
  }

  if (med.premium) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: med.titre }} />
        <View style={[styles.gate, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}>
          <ThemedText style={styles.gateGlyph}>🔒</ThemedText>
          <ThemedText style={[styles.gateTitle, { fontFamily: Fonts.serif, color: theme.text }]}>
            Méditation Premium
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.gateText}>
            {med.description} Accède à toutes les méditations avec l’abonnement « Sous le portique ».
          </ThemedText>
          <Button label="Découvrir Premium" onPress={() => router.push('/profil')} />
        </View>
      </ContentScroll>
    );
  }

  if (med.kind === 'respiration') {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: med.titre }} />
        <Breathing
          meditationId={med.id}
          titre={med.titre}
          targetSeconds={minutesFromLabel(med.dureeLabel) * 60}
        />
      </ContentScroll>
    );
  }

  const source = AUDIO_SOURCES[med.id];
  if (!source) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: med.titre }} />
        <View style={[styles.gate, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}>
          <ThemedText style={styles.gateGlyph}>🎧</ThemedText>
          <ThemedText style={[styles.gateTitle, { fontFamily: Fonts.serif, color: theme.text }]}>
            Audio bientôt disponible
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.gateText}>
            L’enregistrement de cette méditation sera ajouté prochainement.
          </ThemedText>
        </View>
      </ContentScroll>
    );
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: med.titre }} />
      <MeditationPlayer
        meditationId={med.id}
        titre={med.titre}
        glyph={med.glyph}
        description={med.description}
        source={source}
      />
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  gate: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.three,
  },
  gateGlyph: { fontSize: 40 },
  gateTitle: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  gateText: { textAlign: 'center' },
});
