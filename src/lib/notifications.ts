/**
 * Rappels locaux matin/soir (expo-notifications).
 * Note : sur Expo Go (SDK 53+), les notifications sont limitées ; le comportement
 * complet nécessite un dev build. Le code reste fonctionnel et prêt pour la prod.
 */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import type { Reminders } from '@/store/settings';

const CHANNEL_ID = 'rappels';

// Affichage des notifications même app au premier plan.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/** Demande la permission si nécessaire. Renvoie true si accordée. */
export async function ensurePermissions(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

async function ensureChannel(): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Rappels',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

function parseHM(t: string): { hour: number; minute: number } {
  const [h, m] = t.split(':').map((n) => parseInt(n, 10));
  return { hour: Number.isFinite(h) ? h : 7, minute: Number.isFinite(m) ? m : 0 };
}

/**
 * Reprogramme les rappels selon les préférences : annule tout, puis recrée
 * les déclencheurs quotidiens activés. À appeler à chaque changement de réglage.
 */
export async function syncReminders(r: Reminders): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await ensureChannel();

  if (r.matin) {
    const { hour, minute } = parseHM(r.matinTime);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Rituel du matin',
        body: 'Prends un instant pour préparer ta journée en stoïcien.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: CHANNEL_ID,
      },
    });
  }

  if (r.soir) {
    const { hour, minute } = parseHM(r.soirTime);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Rituel du soir',
        body: 'Fais ton examen de conscience : qu’as-tu bien fait aujourd’hui ?',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: CHANNEL_ID,
      },
    });
  }
}
