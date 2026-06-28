import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/store/progress';

// Respiration carrée (box breathing) : 4 phases de 4 s.
const PHASE = 4; // secondes par phase
const CYCLE = PHASE * 4; // 16 s
const PHASES = ['Inspire', 'Retiens', 'Expire', 'Retiens'];

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type Props = {
  meditationId: string;
  titre: string;
  targetSeconds: number;
};

export function Breathing({ meditationId, titre, targetSeconds }: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const markDone = useProgress((s) => s.markMeditationDone);

  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  function stop(completed: boolean) {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    cancelAnimation(scale);
    scale.set(withTiming(1, { duration: 600 }));
    setRunning(false);
    if (completed && elapsed > 0) markDone(meditationId);
  }

  function start() {
    setElapsed(0);
    setRunning(true);
    scale.set(
      withRepeat(
        withSequence(
          withTiming(1.6, { duration: PHASE * 1000, easing: Easing.inOut(Easing.ease) }), // inspire
          withTiming(1.6, { duration: PHASE * 1000 }), // retiens (haut)
          withTiming(1, { duration: PHASE * 1000, easing: Easing.inOut(Easing.ease) }), // expire
          withTiming(1, { duration: PHASE * 1000 }), // retiens (bas)
        ),
        -1,
      ),
    );
    timer.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= targetSeconds) {
          stop(true);
          return targetSeconds;
        }
        return next;
      });
    }, 1000);
  }

  // Nettoyage à la sortie de l'écran.
  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
      cancelAnimation(scale);
    };
  }, [scale]);

  const phaseLabel = running ? PHASES[Math.floor((elapsed % CYCLE) / PHASE)] : 'Prêt ?';

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
        {titre}
      </ThemedText>

      <View style={styles.stage}>
        <Animated.View style={[styles.circle, { backgroundColor: theme.accentSoft, borderColor: theme.accent }, animatedStyle]} />
        <View style={styles.phaseOverlay} pointerEvents="none">
          <ThemedText style={[styles.phase, { color: theme.accent }]}>{phaseLabel}</ThemedText>
        </View>
      </View>

      <ThemedText themeColor="textSecondary" style={styles.timer}>
        {fmt(elapsed)} / {fmt(targetSeconds)}
      </ThemedText>

      <View style={styles.action}>
        {running ? (
          <Button label="Terminer" variant="secondary" onPress={() => stop(true)} />
        ) : (
          <Button label="Commencer" onPress={start} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: Spacing.four, paddingTop: Spacing.four },
  title: { fontSize: 26, fontWeight: '600', textAlign: 'center' },
  stage: { width: 260, height: 260, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 150, height: 150, borderRadius: 75, borderWidth: 2 },
  phaseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phase: { fontSize: 22, fontWeight: '700' },
  timer: { fontSize: 16 },
  action: { alignSelf: 'stretch' },
});
