import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useJournal, type JournalType } from '@/store/journal';
import { formatDate } from '@/lib/date';

const GLYPHS: Record<JournalType, string> = {
  matin: '🌅',
  soir: '🌙',
  exercice: '⚖️',
  libre: '📝',
};

export default function JournalListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const entries = useJournal((s) => s.entries);
  const hydrated = useJournal((s) => s.hydrated);

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: 'Mon journal' }} />

      <Button label="＋ Nouvelle entrée" onPress={() => router.push('/pratiquer/journal/nouvelle')} />

      {hydrated && entries.length === 0 ? (
        <View style={[styles.empty, { borderColor: theme.border }]}>
          <ThemedText style={styles.emptyGlyph}>📔</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.emptyText}>
            Ton journal est vide. Écris une première pensée, ou fais un exercice : il s’y consignera.
          </ThemedText>
        </View>
      ) : null}

      {entries.map((e) => (
        <Card
          key={e.id}
          glyph={GLYPHS[e.type]}
          title={e.titre}
          subtitle={`${formatDate(e.createdAt)}`}
          onPress={() =>
            router.push({ pathname: '/pratiquer/journal/[entryId]', params: { entryId: e.id } })
          }
        />
      ))}
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.lg,
    borderStyle: 'dashed',
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  emptyGlyph: { fontSize: 36 },
  emptyText: { textAlign: 'center' },
});
