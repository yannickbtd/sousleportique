import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ProgressBar } from '@/components/progress-bar';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/store/progress';

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type Props = {
  meditationId: string;
  titre: string;
  glyph: string;
  description: string;
  source: number;
};

export function MeditationPlayer({ meditationId, titre, glyph, description, source }: Props) {
  const theme = useTheme();
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);
  const markDone = useProgress((s) => s.markMeditationDone);

  const duration = status.duration || 0;
  const ratio = duration > 0 ? status.currentTime / duration : 0;

  // Fin de la séance : revenir au début, mettre en pause, comptabiliser.
  useEffect(() => {
    if (status.didJustFinish) {
      player.pause();
      player.seekTo(0);
      markDone(meditationId);
    }
  }, [status.didJustFinish, player, markDone, meditationId]);

  function toggle() {
    if (status.playing) player.pause();
    else player.play();
  }

  function skip(delta: number) {
    const target = Math.max(0, Math.min(duration || Infinity, status.currentTime + delta));
    player.seekTo(target);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.cover, { backgroundColor: theme.accentSoft }]}>
        <ThemedText style={styles.glyph}>{glyph}</ThemedText>
      </View>

      <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
        {titre}
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.desc}>
        {description}
      </ThemedText>

      <View style={[styles.offline, { borderColor: theme.border }]}>
        <ThemedText type="small" style={{ color: theme.accent }}>
          ✓ Disponible hors-ligne
        </ThemedText>
      </View>

      <View style={styles.progressBlock}>
        <ProgressBar ratio={ratio} />
        <View style={styles.times}>
          <ThemedText themeColor="textSecondary" type="small">
            {fmt(status.currentTime)}
          </ThemedText>
          <ThemedText themeColor="textSecondary" type="small">
            {fmt(duration)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable onPress={() => skip(-15)} style={({ pressed }) => [styles.skip, pressed && styles.pressed]}>
          <ThemedText style={[styles.skipText, { color: theme.text }]}>−15s</ThemedText>
        </Pressable>

        <Pressable
          onPress={toggle}
          style={({ pressed }) => [styles.play, { backgroundColor: theme.accent }, pressed && styles.pressed]}>
          <ThemedText style={styles.playGlyph}>{status.playing ? '❚❚' : '▶'}</ThemedText>
        </Pressable>

        <Pressable onPress={() => skip(15)} style={({ pressed }) => [styles.skip, pressed && styles.pressed]}>
          <ThemedText style={[styles.skipText, { color: theme.text }]}>+15s</ThemedText>
        </Pressable>
      </View>

      {!status.isLoaded ? (
        <ThemedText themeColor="textSecondary" type="small" style={styles.loading}>
          Chargement…
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: Spacing.three, paddingTop: Spacing.three },
  cover: {
    width: 160,
    height: 160,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: { fontSize: 72 },
  title: { fontSize: 26, fontWeight: '600', textAlign: 'center' },
  desc: { textAlign: 'center', fontSize: 15, lineHeight: 22, paddingHorizontal: Spacing.two },
  offline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.half,
  },
  progressBlock: { alignSelf: 'stretch', gap: Spacing.one, marginTop: Spacing.two },
  times: { flexDirection: 'row', justifyContent: 'space-between' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.five,
    marginTop: Spacing.two,
  },
  skip: { paddingVertical: Spacing.two, paddingHorizontal: Spacing.two },
  skipText: { fontSize: 16, fontWeight: '600' },
  play: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playGlyph: { fontSize: 26, color: '#FFFFFF' },
  pressed: { opacity: 0.7 },
  loading: { marginTop: Spacing.one },
});
