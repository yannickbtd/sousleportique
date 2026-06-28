import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { useJournal } from '@/store/journal';
import { formatDate } from '@/lib/date';

export default function EntryDetailScreen() {
  const { entryId } = useLocalSearchParams<{ entryId: string }>();
  const router = useRouter();
  const entry = useJournal((s) => s.entries.find((e) => e.id === entryId));
  const remove = useJournal((s) => s.remove);

  if (!entry) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Entrée' }} />
        <ThemedText>Entrée introuvable.</ThemedText>
      </ContentScroll>
    );
  }

  function confirmDelete() {
    Alert.alert('Supprimer cette entrée ?', 'Cette action est définitive.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await remove(entry!.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: 'Entrée' }} />
      <View style={styles.header}>
        <ThemedText style={[styles.title, { fontFamily: Fonts.serif }]}>{entry.titre}</ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          {formatDate(entry.createdAt)}
        </ThemedText>
      </View>

      <ThemedText style={styles.body}>{entry.contenu}</ThemedText>

      <View style={styles.action}>
        <Button label="Supprimer" variant="secondary" onPress={confirmDelete} />
      </View>
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  header: { gap: Spacing.one },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '600' },
  body: { fontSize: 17, lineHeight: 27 },
  action: { marginTop: Spacing.four },
});
