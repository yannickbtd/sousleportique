import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { getModule, type QuizQuestion } from '@/content/modules';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/store/progress';

function Option({
  label,
  state,
  onPress,
}: {
  label: string;
  state: 'idle' | 'selected' | 'correct' | 'wrong';
  onPress?: () => void;
}) {
  const theme = useTheme();
  const bg =
    state === 'correct'
      ? '#2E7D32'
      : state === 'wrong'
        ? '#B23A3A'
        : state === 'selected'
          ? theme.accentSoft
          : theme.backgroundElement;
  const color = state === 'correct' || state === 'wrong' ? '#FFFFFF' : theme.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.option,
        { backgroundColor: bg, borderColor: theme.border },
        pressed && onPress ? { opacity: 0.8 } : null,
      ]}>
      <ThemedText style={[styles.optionText, { color }]}>{label}</ThemedText>
    </Pressable>
  );
}

function QuestionView({
  q,
  index,
  selected,
  submitted,
  onSelect,
}: {
  q: QuizQuestion;
  index: number;
  selected: number | undefined;
  submitted: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <View style={styles.question}>
      <ThemedText style={styles.qTitle}>
        {index + 1}. {q.question}
      </ThemedText>
      {q.options.map((opt, i) => {
        let state: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle';
        if (submitted) {
          if (i === q.correct) state = 'correct';
          else if (i === selected) state = 'wrong';
        } else if (i === selected) {
          state = 'selected';
        }
        return (
          <Option key={i} label={opt} state={state} onPress={submitted ? undefined : () => onSelect(i)} />
        );
      })}
      {submitted && q.explication ? (
        <ThemedText themeColor="textSecondary" type="small" style={{ marginTop: Spacing.one }}>
          💡 {q.explication}
        </ThemedText>
      ) : null}
    </View>
  );
}

export default function QuizScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const mod = getModule(moduleId);
  const setQuizScore = useProgress((s) => s.setQuizScore);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!mod || mod.quiz.length === 0) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Quiz' }} />
        <ThemedText>Aucun quiz pour ce module.</ThemedText>
      </ContentScroll>
    );
  }

  const total = mod.quiz.length;
  const allAnswered = Object.keys(answers).length === total;
  const score = mod.quiz.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);

  function validate() {
    setSubmitted(true);
    setQuizScore(mod!.id, score / total);
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: 'Quiz — ' + mod.titre }} />

      {submitted && (
        <View style={[styles.result, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}>
          <ThemedText style={[styles.resultScore, { color: theme.accent, fontFamily: Fonts.serif }]}>
            {score} / {total}
          </ThemedText>
          <ThemedText themeColor="textSecondary">
            {score === total ? 'Sans faute, digne du Portique.' : 'Relis, puis retente. La sagesse se cultive.'}
          </ThemedText>
        </View>
      )}

      {mod.quiz.map((q, i) => (
        <QuestionView
          key={q.id}
          q={q}
          index={i}
          selected={answers[i]}
          submitted={submitted}
          onSelect={(opt) => setAnswers((a) => ({ ...a, [i]: opt }))}
        />
      ))}

      <View style={styles.action}>
        {submitted ? (
          <>
            <Button label="Recommencer" variant="secondary" onPress={retry} />
            <Button label="Terminer" onPress={() => router.back()} />
          </>
        ) : (
          <Button label="Valider mes réponses" onPress={validate} disabled={!allAnswered} />
        )}
      </View>
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  question: { gap: Spacing.two, marginBottom: Spacing.three },
  qTitle: { fontSize: 17, fontWeight: '600', marginBottom: Spacing.one },
  option: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  optionText: { fontSize: 16 },
  result: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  resultScore: { fontSize: 40, fontWeight: '700' },
  action: { gap: Spacing.two, marginTop: Spacing.two },
});
