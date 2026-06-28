import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ReminderEditor } from '@/components/reminder-editor';
import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ensurePermissions, syncReminders } from '@/lib/notifications';
import { DEFAULT_REMINDERS, useSettings, type Reminders } from '@/store/settings';

const SLIDES = [
  {
    glyph: '🏛️',
    titre: 'Sous le portique',
    texte:
      'Le stoïcisme, non pas seulement étudié, mais vécu. Comprendre, puis pratiquer — un pas à la fois.',
  },
  {
    glyph: '📖',
    titre: 'Apprendre',
    texte: 'Un parcours clair, des sources identifiées : Sénèque, Épictète, Marc Aurèle, Musonius.',
  },
  {
    glyph: '🍃',
    titre: 'Pratiquer',
    texte: 'Des exercices spirituels guidés et un journal personnel, privé et chiffré.',
  },
  {
    glyph: '🌙',
    titre: 'Méditer',
    texte: 'Des méditations guidées et la respiration, pour revenir à l’instant.',
  },
];

const OBJECTIFS = ['Découvrir le stoïcisme', 'Pratiquer au quotidien', 'Approfondir mes connaissances'];

const LAST_SLIDE = SLIDES.length - 1;
const STEP_CONSENT = SLIDES.length; // 4
const STEP_QUESTIONS = SLIDES.length + 1; // 5

export function Onboarding() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const completeOnboarding = useSettings((s) => s.completeOnboarding);

  const [step, setStep] = useState(0);
  const [objectif, setObjectif] = useState<string | undefined>(undefined);
  const [analytics, setAnalytics] = useState(false);
  const [reminders, setReminders] = useState<Reminders>(DEFAULT_REMINDERS);

  async function finish() {
    completeOnboarding({ objectif, analytics, reminders });
    if (reminders.matin || reminders.soir) {
      try {
        const ok = await ensurePermissions();
        if (ok) await syncReminders(reminders);
      } catch {
        /* notifications indisponibles (Expo Go) — sans bloquer */
      }
    }
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          {step <= LAST_SLIDE ? (
            <View style={styles.slide}>
              <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
                <ThemedText style={styles.glyph}>{SLIDES[step].glyph}</ThemedText>
              </View>
              <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
                {SLIDES[step].titre}
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.text}>
                {SLIDES[step].texte}
              </ThemedText>
            </View>
          ) : null}

          {step === STEP_CONSENT ? (
            <View style={styles.section}>
              <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
                Ta vie privée
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.text}>
                Pas de compte requis. Ton journal reste sur ton téléphone, chiffré. Tu peux nous
                aider à améliorer l’app en partageant des statistiques d’usage anonymes.
              </ThemedText>
              <Pressable
                onPress={() => setAnalytics((v) => !v)}
                style={[styles.consent, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
                <View style={styles.consentTexts}>
                  <ThemedText style={styles.consentTitle}>Statistiques anonymes</ThemedText>
                  <ThemedText themeColor="textSecondary" type="small">
                    Optionnel — modifiable à tout moment.
                  </ThemedText>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: theme.accent, backgroundColor: analytics ? theme.accent : 'transparent' },
                  ]}>
                  {analytics ? <ThemedText style={styles.check}>✓</ThemedText> : null}
                </View>
              </Pressable>
            </View>
          ) : null}

          {step === STEP_QUESTIONS ? (
            <View style={styles.section}>
              <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
                Personnalise
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.text}>
                Quel est ton objectif principal ?
              </ThemedText>
              <View style={styles.objectifs}>
                {OBJECTIFS.map((o) => {
                  const selected = o === objectif;
                  return (
                    <Pressable
                      key={o}
                      onPress={() => setObjectif(o)}
                      style={[
                        styles.objectif,
                        {
                          borderColor: selected ? theme.accent : theme.border,
                          backgroundColor: selected ? theme.accentSoft : theme.backgroundElement,
                        },
                      ]}>
                      <ThemedText style={{ color: selected ? theme.accent : theme.text, fontWeight: '600' }}>
                        {o}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>

              <ThemedText themeColor="textSecondary" style={[styles.text, { marginTop: Spacing.two }]}>
                Tes rappels quotidiens :
              </ThemedText>
              <ReminderEditor value={reminders} onChange={setReminders} />
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.three }]}>
        <View style={styles.dots}>
          {Array.from({ length: STEP_QUESTIONS + 1 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === step ? theme.accent : theme.border },
              ]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          {step > 0 ? (
            <Button label="Précédent" variant="secondary" onPress={() => setStep((s) => s - 1)} />
          ) : null}
          {step < STEP_QUESTIONS ? (
            <Button label="Suivant" onPress={() => setStep((s) => s + 1)} />
          ) : (
            <Button label="Commencer" onPress={finish} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: Spacing.four },
  inner: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  slide: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.six },
  badge: { width: 120, height: 120, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 56 },
  title: { fontSize: 30, fontWeight: '600', textAlign: 'center' },
  text: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  section: { gap: Spacing.three, paddingVertical: Spacing.four },
  consent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  consentTexts: { flex: 1, gap: Spacing.half },
  consentTitle: { fontSize: 16, fontWeight: '600' },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: { color: '#FFFFFF', fontWeight: '700' },
  objectifs: { gap: Spacing.two },
  objectif: { borderWidth: StyleSheet.hairlineWidth, borderRadius: Radius.md, padding: Spacing.three },
  footer: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.one },
  dot: { width: 8, height: 8, borderRadius: 4 },
  actions: { gap: Spacing.two },
});
