import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Barre de progression fine. `ratio` entre 0 et 1. */
export function ProgressBar({ ratio }: { ratio: number }) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(1, ratio));

  return (
    <View style={[styles.track, { backgroundColor: theme.accentSoft }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped * 100}%`, backgroundColor: theme.accent },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: Radius.pill },
});
