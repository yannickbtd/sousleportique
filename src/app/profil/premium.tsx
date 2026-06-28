import { Stack } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ContentScroll } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatDate } from '@/lib/date';
import { cancel, OFFERS, purchase, restore, TRIAL_DAYS } from '@/lib/purchases';
import { useSettings, type Plan } from '@/store/settings';

const AVANTAGES = [
  'Tous les modules d’apprentissage',
  'Tous les exercices spirituels avancés',
  'Toutes les méditations guidées',
  'Nouvelles méditations chaque mois',
];

export default function PremiumScreen() {
  const theme = useTheme();
  const premiumActive = useSettings((s) => s.premiumActive);
  const premiumPlan = useSettings((s) => s.premiumPlan);
  const premiumSince = useSettings((s) => s.premiumSince);

  const [selected, setSelected] = useState<Plan>('annuel');
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    setLoading(true);
    try {
      await purchase(selected);
    } finally {
      setLoading(false);
    }
  }

  async function onRestore() {
    const ok = await restore();
    if (!ok) Alert.alert('Restauration', 'Aucun abonnement actif à restaurer.');
  }

  async function onCancel() {
    Alert.alert('Résilier (démo)', 'Désactiver le premium pour tester le verrouillage ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Résilier', style: 'destructive', onPress: () => cancel() },
    ]);
  }

  if (premiumActive) {
    return (
      <ContentScroll>
        <Stack.Screen options={{ title: 'Premium' }} />
        <View style={[styles.member, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}>
          <ThemedText style={styles.glyph}>✦</ThemedText>
          <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
            Tu es membre Premium
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.center}>
            Abonnement {premiumPlan === 'annuel' ? 'annuel' : 'mensuel'}
            {premiumSince ? ` · depuis le ${formatDate(premiumSince)}` : ''}.
          </ThemedText>
        </View>
        <Button label="Résilier (démo)" variant="secondary" onPress={onCancel} />
      </ContentScroll>
    );
  }

  return (
    <ContentScroll>
      <Stack.Screen options={{ title: 'Premium' }} />

      <View style={styles.hero}>
        <ThemedText style={styles.glyph}>✦</ThemedText>
        <ThemedText style={[styles.title, { fontFamily: Fonts.serif, color: theme.text }]}>
          Sous le portique — Premium
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.center}>
          {TRIAL_DAYS} jours d’essai gratuit, puis sans engagement.
        </ThemedText>
      </View>

      <View style={[styles.avantages, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        {AVANTAGES.map((a) => (
          <View key={a} style={styles.avantageRow}>
            <ThemedText style={{ color: theme.accent }}>✓</ThemedText>
            <ThemedText style={styles.avantageText}>{a}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.offers}>
        {OFFERS.map((o) => {
          const isSel = o.plan === selected;
          return (
            <Pressable
              key={o.plan}
              onPress={() => setSelected(o.plan)}
              style={[
                styles.offer,
                {
                  borderColor: isSel ? theme.accent : theme.border,
                  backgroundColor: isSel ? theme.accentSoft : theme.backgroundElement,
                  borderWidth: isSel ? 2 : StyleSheet.hairlineWidth,
                },
              ]}>
              <View style={styles.offerLeft}>
                <ThemedText style={styles.offerLabel}>{o.label}</ThemedText>
                <ThemedText themeColor="textSecondary" type="small">
                  {o.caption}
                </ThemedText>
              </View>
              <View style={styles.offerRight}>
                {o.best ? (
                  <View style={[styles.bestBadge, { backgroundColor: theme.accent }]}>
                    <ThemedText style={styles.bestText}>Le plus avantageux</ThemedText>
                  </View>
                ) : null}
                <ThemedText style={[styles.offerPrice, { color: theme.text }]}>{o.price}</ThemedText>
              </View>
            </Pressable>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator color={theme.accent} style={{ marginVertical: Spacing.three }} />
      ) : (
        <Button label={`Commencer l’essai gratuit (${TRIAL_DAYS} j)`} onPress={subscribe} />
      )}

      <Pressable onPress={onRestore} style={styles.restore}>
        <ThemedText style={{ color: theme.accent, textAlign: 'center' }}>
          Restaurer mes achats
        </ThemedText>
      </Pressable>

      <View style={[styles.mock, { borderColor: theme.border }]}>
        <ThemedText themeColor="textSecondary" type="small" style={styles.center}>
          🧪 Démo — paiement simulé. Le vrai abonnement (App Store / Google Play via RevenueCat)
          sera branché lors du passage en dev build.
        </ThemedText>
      </View>
    </ContentScroll>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.three },
  glyph: { fontSize: 44 },
  title: { fontSize: 26, fontWeight: '600', textAlign: 'center' },
  center: { textAlign: 'center' },
  avantages: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  avantageRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  avantageText: { fontSize: 15, flexShrink: 1 },
  offers: { gap: Spacing.two },
  offer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  offerLeft: { gap: Spacing.half },
  offerLabel: { fontSize: 17, fontWeight: '700' },
  offerRight: { alignItems: 'flex-end', gap: Spacing.half },
  offerPrice: { fontSize: 17, fontWeight: '700' },
  bestBadge: { borderRadius: Radius.pill, paddingHorizontal: Spacing.two, paddingVertical: 1 },
  bestText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  restore: { paddingVertical: Spacing.three },
  member: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  mock: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
    padding: Spacing.three,
    marginTop: Spacing.two,
  },
});
