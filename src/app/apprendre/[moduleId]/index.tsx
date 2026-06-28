import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { ContentScroll } from '@/components/screen';
import { PremiumGate } from '@/components/premium-gate';
import { ProgressBar } from '@/components/progress-bar';
import { ThemedText } from '@/components/themed-text';
import { getModule } from '@/content/modules';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useIsLessonComplete, useModuleProgress } from '@/store/progress';
import { usePremium } from '@/store/settings';

function LessonRow({ moduleId, lessonId, titre, duree, onPress }: {
  moduleId: string;
  lessonId: string;
  titre: string;
  duree: string;
  onPress: () => void;
}) {
  const done = useIsLessonComplete(moduleId, lessonId);
  return (
    <Card glyph={done ? '✅' : '📖'} title={titre} subtitle={duree} onPress={onPress} />
  );
}

export default function ModuleDetailScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const isPremium = usePremium();
  const mod = getModule(moduleId);
  const { done, total, ratio } = useModuleProgress(moduleId ?? '');

  if (!mod) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Module' }} />
        <ThemedText>Module introuvable.</ThemedText>
      </ContentScroll>
    );
  }

  if (mod.premium && !isPremium) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: mod.titre }} />
        <PremiumGate kind="Module" description={mod.resume} />
      </ContentScroll>
    );
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: mod.titre }} />

      <View style={styles.headerBlock}>
        <ThemedText themeColor="textSecondary">{mod.resume}</ThemedText>
        <View style={styles.progress}>
          <ProgressBar ratio={ratio} />
          <ThemedText themeColor="textSecondary" type="small">
            {done} / {total} leçons terminées
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.sectionTitle}>Leçons</ThemedText>
      {mod.lessons.map((l) => (
        <LessonRow
          key={l.id}
          moduleId={mod.id}
          lessonId={l.id}
          titre={l.titre}
          duree={l.duree}
          onPress={() =>
            router.push({
              pathname: '/apprendre/[moduleId]/lecon/[lessonId]',
              params: { moduleId: mod.id, lessonId: l.id },
            })
          }
        />
      ))}

      {mod.glossaire.length > 0 && (
        <>
          <ThemedText style={styles.sectionTitle}>Glossaire</ThemedText>
          <View style={[styles.glossaire, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            {mod.glossaire.map((g) => (
              <View key={g.terme} style={styles.term}>
                <ThemedText style={[styles.termName, { color: theme.accent }]}>{g.terme}</ThemedText>
                <ThemedText themeColor="textSecondary" type="small">
                  {g.definition}
                </ThemedText>
              </View>
            ))}
          </View>
        </>
      )}

      {mod.quiz.length > 0 && (
        <>
          <ThemedText style={styles.sectionTitle}>Évaluation</ThemedText>
          <Card
            glyph="🧠"
            title="Quiz du module"
            subtitle={`${mod.quiz.length} questions`}
            badge="Tester"
            onPress={() =>
              router.push({ pathname: '/apprendre/[moduleId]/quiz', params: { moduleId: mod.id } })
            }
          />
        </>
      )}
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  headerBlock: { gap: Spacing.three },
  progress: { gap: Spacing.one },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: Spacing.two },
  glossaire: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  term: { gap: Spacing.half },
  termName: { fontSize: 15, fontWeight: '700' },
});
