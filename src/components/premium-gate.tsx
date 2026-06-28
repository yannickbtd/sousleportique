import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Écran de verrouillage premium réutilisable (module, exercice, méditation). */
export function PremiumGate({ kind, description }: { kind: string; description: string }) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.gate, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}>
      <ThemedText style={styles.glyph}>🔒</ThemedText>
      <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
        {kind} Premium
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.text}>
        {description} Accède à tout le contenu avec l’abonnement « Sous le portique ».
      </ThemedText>
      <Button label="Découvrir Premium" onPress={() => router.push('/profil/premium')} />
    </View>
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
  glyph: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  text: { textAlign: 'center' },
});
