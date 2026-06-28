# Phase 2 — Rapport faisabilité / fiabilité / rentabilité

**« Sous le portique »** — Version 1.0 — 28 juin 2026

> Synthèse décisionnelle avant développement. Tous les montants sont en € TTC, ordres de grandeur marché francophone 2026.

---

## 1. FAISABILITÉ

### 1.1 Faisabilité technique — **Élevée** ✅

| Brique | Difficulté | Commentaire |
|--------|-----------|-------------|
| 3 piliers (contenu, exercices, journal) | Faible | CRUD + lecture de contenu structuré, rien d'exotique |
| Lecture/téléchargement audio offline | Faible/Moyenne | `expo-audio` couvre le besoin |
| Notifications locales matin/soir | Faible | `expo-notifications` |
| Abonnements (essai, restauration) | **Moyenne** | RevenueCat fiabilise ; le vrai travail est la config stores |
| Sync CMS + offline-first | Moyenne | TanStack Query + SQLite, pattern éprouvé |
| Chiffrement journal | Faible/Moyenne | secure-store + chiffrement avant écriture |

**Verdict** : aucun verrou technologique. Expo couvre 100 % du périmètre MVP. Le risque technique est **faible**.

### 1.2 Faisabilité contenu — **C'est ICI le vrai sujet** ⚠️

Le code n'est pas le goulot d'étranglement : **le contenu l'est**.

- **Textes** : ~18 leçons + 9 fiches d'exercices + 60 citations = travail de rédaction/sourcing conséquent.
- **Audio** : ~10 méditations = écriture des scripts + enregistrement voix + montage.
- **Juridique (bloquant)** : œuvres antiques libres de droits, **mais traductions modernes et ouvrages Hadot/Robertson/Goarzin protégés**.
  - ✅ Solution : rédiger des contenus **originaux** (tes propres synthèses pédagogiques) + citer les sources primaires via des **traductions du domaine public** (ex. traductions anciennes de Marc Aurèle/Épictète) ou tes propres traductions.
  - ❌ À éviter : recopier des passages de *La citadelle intérieure* ou une traduction récente sous droits.
  - Les **idées** (dichotomie du contrôle, exercices spirituels) ne sont pas protégeables — seule leur **formulation exacte** l'est.

**Verdict** : faisable, à condition de produire du contenu original. C'est le poste le plus coûteux en temps/argent (voir §3).

### 1.3 Faisabilité réglementaire — **Élevée** ✅
RGPD gérable (pas de compte obligatoire, journal local). Guidelines stores respectées (paiement natif, pas de claim médical). Politique de confidentialité requise.

---

## 2. FIABILITÉ

| Axe | Cible | Moyen |
|-----|-------|-------|
| Stabilité | Crash-free ≥ 99,5 % | Sentry + TS strict + tests E2E Maestro |
| Données journal | 0 perte | SQLite + chiffrement + écritures transactionnelles |
| Offline | 100 % du contenu gratuit + premium téléchargé | Bundle embarqué + cache SQLite |
| Paiements | Pas de double-charge / état cohérent | RevenueCat (source de vérité abonnement) |
| Disponibilité contenu | App marche même si CMS down | Fallback bundle embarqué |
| Correctifs rapides | < 24 h pour un bug JS | OTA `expo-updates` (sans review store) |

**Points de vigilance fiabilité :**
- Tester les **edge cases d'abonnement** (essai expiré, remboursement, changement d'appareil, restauration) — c'est la source n°1 de tickets.
- Gérer la **migration de schéma SQLite** proprement dès le départ (sinon corruption du journal en MAJ).
- Couvrir le **mode avion** dans les tests E2E.

**Verdict fiabilité** : atteignable avec une discipline de test sur les 3 flows critiques (achat, offline, journal).

---

## 3. RENTABILITÉ

### 3.1 Coûts de mise en place (one-time)

Deux scénarios selon ton implication.

| Poste | Scénario A — « Tu produis » (toi + moi) | Scénario B — « Délégué » (prestataires) |
|-------|------------------------------------------|------------------------------------------|
| Développement MVP | 0 € (ton temps + moi) | 15 000 – 30 000 € |
| Rédaction contenu (18 leçons + 9 exos + citations) | 0 € (toi) | 2 000 – 3 500 € |
| Scripts + voix-off 10 méditations | 0 € (toi) ou ~800 € voix | 2 500 – 6 000 € |
| Design UI/UX (design system + écrans) | 0 € (gabarits + moi) | 3 000 – 8 000 € |
| Comptes développeurs | 99 € (Apple/an) + 25 € (Google, unique) | idem |
| Visuels / icône / illustrations | 0 – 200 € (banques + IA) | 500 – 1 500 € |
| **Total mise en place** | **~150 – 1 100 €** | **~23 000 – 49 000 €** |

> Le scénario A est réaliste ici : tu maîtrises le fond stoïcien, et je porte le développement. Le seul vrai cash à prévoir = comptes stores + éventuellement une voix-off pro pour les méditations.

### 3.2 Coûts récurrents (annuels)

| Service | Coût démarrage | À l'échelle |
|---------|----------------|-------------|
| Apple Developer | 99 €/an | 99 €/an |
| Google Play | 0 (déjà payé) | 0 |
| Supabase | 0 (free tier) | ~25 €/mois (Pro) si volume |
| RevenueCat | 0 (gratuit < 2 500 $/mois de revenu) | 1 % du revenu au-delà |
| Sentry / PostHog | 0 (free tiers) | 0 – 30 €/mois |
| Domaine + page web | ~15 €/an | ~15 €/an |
| **Total récurrent** | **~120 €/an au démarrage** | **~600 – 1 000 €/an** |

> Charges récurrentes **négligeables** tant que le volume est modéré. Commissions stores : **15 %** (programme small business < 1 M$/an) au lieu de 30 %.

### 3.3 Hypothèses de revenu

Paramètres :
- Prix annuel **29,99 €** (favorisé), mensuel **4,99 €**. ARPPU net ≈ **22 €/an** après commission store 15 % + 1 % RevenueCat.
- Taux de conversion free→payant : **3 %** (prudent) à **5 %** (bon onboarding).
- Rétention abonnés annuels ~50–60 %.

### 3.4 Scénarios de rentabilité (année 1)

| Scénario | Téléch. an 1 | Conv. | Abonnés payants | Revenu net (~22 €/abonné) | Résultat (scénario coûts A) |
|----------|--------------|-------|-----------------|---------------------------|------------------------------|
| Pessimiste | 5 000 | 3 % | 150 | ~3 300 € | **+ ~3 100 €** |
| Réaliste | 20 000 | 4 % | 800 | ~17 600 € | **+ ~17 000 €** |
| Optimiste | 60 000 | 5 % | 3 000 | ~66 000 € | **+ ~65 000 €** ; couvre largement le scénario B |

**Seuil de rentabilité (scénario coûts A)** : atteint dès **~10–15 abonnés annuels** (couvre les ~150 €/an de frais). Le projet est **structurellement rentable** car les coûts fixes sont minimes ; tout l'enjeu est le **volume d'acquisition**.

**Seuil de rentabilité (scénario coûts B, ~35 k€ investis)** : il faut **~1 600 abonnés annuels** cumulés — atteignable seulement dans le scénario réaliste-haut/optimiste.

### 3.5 Leviers de rentabilité
- **Annuel > mensuel** (cash upfront, meilleure rétention) → mettre l'annuel en avant.
- **Onboarding soigné** = le plus gros levier sur la conversion.
- **Acquisition organique** : ASO (mots-clés « stoïcisme », « Marc Aurèle », « méditation philosophie »), contenu (le sérieux des sources est viral dans cette niche), partenariats (StoaGallica, comptes philo).
- **Sorties mensuelles** de méditations = rétention premium.

---

## 4. SYNTHÈSE & RECOMMANDATION

| Critère | Évaluation |
|---------|------------|
| Faisabilité technique | ✅ Élevée — aucun verrou |
| Faisabilité contenu | ⚠️ Moyenne — original obligatoire, poste le plus lourd |
| Faisabilité juridique | ✅ Gérable — contenu original + sources libres de droits |
| Fiabilité | ✅ Atteignable — discipline sur achat/offline/journal |
| Rentabilité | ✅ Forte en scénario A (coûts fixes minimes) ; dépend du volume en scénario B |

### Recommandation de lead
**Go pour le développement**, en **scénario A** (production interne + dev avec moi), pour minimiser le risque financier. Le risque dominant n'est ni technique ni financier mais **la production de contenu original** et **l'acquisition d'utilisateurs**. Je recommande :

1. **Geler le contenu MVP d'abord** (rédiger les 18 leçons + 9 exercices + scripts méditations) — le dev ira vite, le contenu non.
2. Démarrer le dev en parallèle sur le **socle** (navigation, design system, lecteur de contenu) qui ne dépend pas du contenu final.
3. Investir une éventuelle dépense unique dans une **voix-off pro** pour les méditations (différenciateur qualité).

---

## 5. Planning macro de développement (scénario A)

| Sprint (≈ 1–2 sem.) | Livrable |
|----------------------|----------|
| S1 | Setup Expo/TS, design system, navigation à onglets, thème clair/sombre |
| S2 | Pilier **Apprendre** : modules, lecteur de leçon, quiz, progression |
| S3 | Pilier **Pratiquer** : catalogue, exercice guidé, journal chiffré (SQLite) |
| S4 | Pilier **Méditer** : lecteur audio, offline, respiration animée |
| S5 | Onboarding + notifications + Accueil/dashboard + streak |
| S6 | **Paywall + RevenueCat** (essai/mensuel/annuel/restauration) + CMS Supabase |
| S7 | Polissage, accessibilité, tests E2E Maestro, Sentry/PostHog |
| S8 | Builds EAS, TestFlight / Play Internal, soumission stores |

> Estimation : **~8 sprints** pour un MVP soumis aux stores (rythme variable selon ta disponibilité et l'avancement du contenu).

---

*Fin du rapport Phase 2 — en attente de ta validation pour démarrer la Phase 3 (développement).*
