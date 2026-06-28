import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentScroll } from '@/components/screen';
import { ReminderEditor } from '@/components/reminder-editor';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ensurePermissions, syncReminders } from '@/lib/notifications';
import { useSettings, type Reminders } from '@/store/settings';

export default function RappelsScreen() {
  const theme = useTheme();
  const reminders = useSettings((s) => s.reminders);
  const setReminders = useSettings((s) => s.setReminders);

  async function onChange(next: Reminders) {
    setReminders(next);
    try {
      if (next.matin || next.soir) await ensurePermissions();
      await syncReminders(next);
    } catch {
      /* notifications indisponibles (Expo Go) — sans bloquer */
    }
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: 'Rappels' }} />
      <ThemedText themeColor="textSecondary" style={styles.intro}>
        Choisis quand recevoir l’invitation à tes rituels du matin et du soir.
      </ThemedText>

      <ReminderEditor value={reminders} onChange={onChange} />

      <View style={[styles.note, { borderColor: theme.border }]}>
        <ThemedText themeColor="textSecondary" type="small">
          💡 Sur Expo Go, les notifications peuvent être limitées. Elles fonctionnent pleinement
          dans une version compilée (dev build / production).
        </ThemedText>
      </View>
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  intro: { fontSize: 15, lineHeight: 22 },
  note: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
    padding: Spacing.three,
    marginTop: Spacing.three,
  },
});
