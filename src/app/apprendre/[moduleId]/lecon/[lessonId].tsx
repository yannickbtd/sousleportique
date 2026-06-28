import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { getLesson, type Block } from '@/content/modules';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useIsLessonComplete, useProgress } from '@/store/progress';

function BlockView({ block }: { block: Block }) {
  const theme = useTheme();
  if (block.type === 'h') {
    return (
      <ThemedText style={[styles.h, { fontFamily: Fonts.serif, color: theme.text }]}>
        {block.text}
      </ThemedText>
    );
  }
  if (block.type === 'quote') {
    return (
      <View style={[styles.quote, { borderColor: theme.accent, backgroundColor: theme.accentSoft }]}>
        <ThemedText style={[styles.quoteText, { fontFamily: Fonts.serif, color: theme.text }]}>
          « {block.text} »
        </ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          — {block.source}
        </ThemedText>
      </View>
    );
  }
  return <ThemedText style={styles.p}>{block.text}</ThemedText>;
}

export default function LessonScreen() {
  const { moduleId, lessonId } = useLocalSearchParams<{ moduleId: string; lessonId: string }>();
  const router = useRouter();
  const lesson = getLesson(moduleId, lessonId);
  const done = useIsLessonComplete(moduleId ?? '', lessonId ?? '');
  const markComplete = useProgress((s) => s.markLessonComplete);

  if (!lesson) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Leçon' }} />
        <ThemedText>Leçon introuvable.</ThemedText>
      </ContentScroll>
    );
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: lesson.duree }} />
      <ThemedText style={[styles.title, { fontFamily: Fonts.serif }]}>{lesson.titre}</ThemedText>

      <View style={styles.blocks}>
        {lesson.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </View>

      <View style={styles.action}>
        {done ? (
          <Button label="✓ Leçon terminée — retour" variant="secondary" onPress={() => router.back()} />
        ) : (
          <Button
            label="Marquer comme terminé"
            onPress={() => {
              markComplete(moduleId, lessonId);
              router.back();
            }}
          />
        )}
      </View>
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, lineHeight: 32, fontWeight: '600' },
  blocks: { gap: Spacing.three },
  h: { fontSize: 19, fontWeight: '600', marginTop: Spacing.two },
  p: { fontSize: 17, lineHeight: 27 },
  quote: {
    borderLeftWidth: 3,
    borderRadius: Radius.sm,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  quoteText: { fontSize: 18, lineHeight: 26, fontStyle: 'italic' },
  action: { marginTop: Spacing.four },
});
