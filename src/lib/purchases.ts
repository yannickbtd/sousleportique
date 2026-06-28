/**
 * Couche d'abonnement — IMPLÉMENTATION MOCK (paiement simulé).
 *
 * Cette interface est volontairement isolée pour être remplacée par RevenueCat
 * (`react-native-purchases`) sans toucher au reste de l'app :
 *   - `purchase(plan)`  → Purchases.purchasePackage(...)
 *   - `restore()`       → Purchases.restorePurchases()
 *   - l'état premium    → dérivé de customerInfo.entitlements
 * RevenueCat est un module natif → nécessite un dev build (pas Expo Go).
 */
import type { Plan } from '@/store/settings';
import { useSettings } from '@/store/settings';

export type Offer = {
  plan: Plan;
  label: string;
  price: string;
  caption: string;
  best?: boolean;
};

export const TRIAL_DAYS = 7;

export const OFFERS: Offer[] = [
  { plan: 'annuel', label: 'Annuel', price: '29,99 €', caption: 'par an · ~2,50 €/mois', best: true },
  { plan: 'mensuel', label: 'Mensuel', price: '4,99 €', caption: 'par mois' },
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Simule un achat d'abonnement et active le premium. */
export async function purchase(plan: Plan): Promise<void> {
  await delay(900); // simule l'aller-retour du store
  useSettings.getState().setPremium(true, plan);
}

/** Simule une restauration d'achats. Renvoie true si un abonnement est actif. */
export async function restore(): Promise<boolean> {
  await delay(600);
  return useSettings.getState().premiumActive;
}

/** Mock : résilie l'abonnement (utile pour tester le verrouillage du contenu). */
export async function cancel(): Promise<void> {
  await delay(300);
  useSettings.getState().setPremium(false);
}
