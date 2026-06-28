import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Reminders } from '@/store/settings';

const MATIN_TIMES = ['06:30', '07:00', '07:30', '08:00'];
const SOIR_TIMES = ['20:00', '21:00', '21:30', '22:00'];

function TimeChips({
  times,
  value,
  onSelect,
}: {
  times: string[];
  value: string;
  onSelect: (t: string) => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.chips}>
      {times.map((t) => {
        const selected = t === value;
        return (
          <Pressable
            key={t}
            onPress={() => onSelect(t)}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? theme.accent : theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}>
            <ThemedText style={[styles.chipText, { color: selected ? '#FFFFFF' : theme.text }]}>
              {t}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ReminderEditor({
  value,
  onChange,
}: {
  value: Reminders;
  onChange: (r: Reminders) => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.block, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={styles.row}>
          <ThemedText style={styles.label}>🌅 Rituel du matin</ThemedText>
          <Switch
            value={value.matin}
            onValueChange={(matin) => onChange({ ...value, matin })}
            trackColor={{ true: theme.accent }}
          />
        </View>
        {value.matin ? (
          <TimeChips
            times={MATIN_TIMES}
            value={value.matinTime}
            onSelect={(matinTime) => onChange({ ...value, matinTime })}
          />
        ) : null}
      </View>

      <View style={[styles.block, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={styles.row}>
          <ThemedText style={styles.label}>🌙 Rituel du soir</ThemedText>
          <Switch
            value={value.soir}
            onValueChange={(soir) => onChange({ ...value, soir })}
            trackColor={{ true: theme.accent }}
          />
        </View>
        {value.soir ? (
          <TimeChips
            times={SOIR_TIMES}
            value={value.soirTime}
            onSelect={(soirTime) => onChange({ ...value, soirTime })}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.three },
  block: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 16, fontWeight: '600' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  chip: {
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  chipText: { fontSize: 15, fontWeight: '600' },
});
