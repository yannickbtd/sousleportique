import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { PremiumGate } from '@/components/premium-gate';
import { ProgressBar } from '@/components/progress-bar';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { getExercise } from '@/content/exercises';
import { BottomTabInset, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useJournal } from '@/store/journal';
import { usePremium } from '@/store/settings';

export default function ExerciseScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const add = useJournal((s) => s.add);
  const isPremium = usePremium();
  const exercise = getExercise(exerciseId);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  if (!exercise) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Exercice' }} />
        <ThemedText>Exercice introuvable.</ThemedText>
      </ContentScroll>
    );
  }

  if (exercise.premium && !isPremium) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: exercise.titre }} />
        <PremiumGate kind="Exercice" description={exercise.intro} />
      </ContentScroll>
    );
  }

  const step = exercise.steps[stepIndex];
  const total = exercise.steps.length;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === total - 1;

  async function finish() {
    const lines = exercise!.steps
      .map((s, i) => (s.prompt && answers[i]?.trim() ? `${s.prompt}\n${answers[i].trim()}` : null))
      .filter(Boolean) as string[];

    if (lines.length > 0) {
      await add({
        type: exercise!.journalType,
        titre: exercise!.titre,
        contenu: lines.join('\n\n'),
        exerciceId: exercise!.id,
      });
      router.replace('/pratiquer/journal');
    } else {
      router.back();
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: exercise.titre }} />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + BottomTabInset + Spacing.four },
        ]}>
        <View style={styles.inner}>
          <View style={styles.progress}>
            <ProgressBar ratio={(stepIndex + 1) / total} />
            <ThemedText themeColor="textSecondary" type="small">
              Étape {stepIndex + 1} / {total}
            </ThemedText>
          </View>

          {isFirst ? (
            <ThemedText themeColor="textSecondary" style={styles.intro}>
              {exercise.intro}
            </ThemedText>
          ) : null}

          <ThemedText style={[styles.stepTitle, { fontFamily: Fonts.serif, color: theme.text }]}>
            {step.titre}
          </ThemedText>
          <ThemedText style={styles.instruction}>{step.instruction}</ThemedText>

          {step.prompt ? (
            <Field
              label={step.prompt}
              value={answers[stepIndex] ?? ''}
              onChangeText={(t) => setAnswers((a) => ({ ...a, [stepIndex]: t }))}
              placeholder="Écris librement…"
            />
          ) : null}

          <View style={styles.actions}>
            {!isFirst ? (
              <Button label="Précédent" variant="secondary" onPress={() => setStepIndex((i) => i - 1)} />
            ) : null}
            {isLast ? (
              <Button label="Terminer" onPress={finish} />
            ) : (
              <Button label="Suivant" onPress={() => setStepIndex((i) => i + 1)} />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: Spacing.four, paddingTop: Spacing.three },
  inner: { width: '100%', maxWidth: MaxContentWidth, gap: Spacing.three },
  progress: { gap: Spacing.one },
  intro: { fontSize: 16, lineHeight: 24 },
  stepTitle: { fontSize: 24, fontWeight: '600', marginTop: Spacing.two },
  instruction: { fontSize: 17, lineHeight: 26 },
  actions: { gap: Spacing.two, marginTop: Spacing.three },
});
