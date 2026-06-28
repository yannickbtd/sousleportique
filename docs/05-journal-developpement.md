# Journal de développement (Phase 3)

## Sprint 1 — Setup, design system & navigation ✅

**Stack installée** : Expo SDK 56, React 19.2, React Native 0.85, Expo Router (file-based, `src/app/`), TypeScript strict, React Compiler activé.

**Réalisé :**
- Scaffold Expo + structure `src/` (app, components, content, constants, hooks).
- **Design system « marbre & portique »** (`src/constants/theme.ts`) : palette claire (marbre) / sombre (charbon), accent bronze/or, échelle `Spacing` + `Radius`, polices (serif pour titres/citations).
- **Navigation native à 5 onglets** (`src/components/app-tabs.tsx`) : Accueil, Apprendre, Pratiquer, Méditer, Profil — icônes SF Symbols (iOS) + Material (Android), pas d'asset PNG.
- **Composants réutilisables** : `Screen` (coquille safe-area + en-tête), `Card` (contenu, badge premium, cadenas).
- **5 écrans** (skeletons soignés) :
  - *Accueil* : citation du jour (déterministe), rituel matin/soir contextuel, série.
  - *Apprendre* : modules (Fondations gratuit, autres premium).
  - *Pratiquer* : journal + exercices spirituels sourcés (Épictète, Sénèque, Marc Aurèle, Hadot).
  - *Méditer* : catalogue (audio à fournir → `assets/audio/`).
  - *Profil* : stats, CTA premium, réglages, sources.
- **Contenu seed** : `src/content/citations.ts` — citations en formulations FR originales (évite les droits sur traductions modernes).
- `assets/audio/` créé avec convention de nommage pour les MP3 fournis par l'auteur.

**Qualité :** `tsc --noEmit` clean ✅ · `expo lint` clean ✅ · `expo export` (iOS) bundle 1468 modules sans erreur ✅.

---

## Sprint 2 — Pilier « Apprendre » ✅

**Réalisé :**
- **Modèle de contenu** (`src/content/modules.ts`) : modules → leçons (blocs titre/paragraphe/citation) + glossaire + quiz. Module **Fondations** entièrement rédigé (4 leçons, glossaire de 5 termes, quiz de 4 questions) en FR original. Modules *Figures* & *Concepts* en premium (gate).
- **Navigation Apprendre** en Stack (`src/app/apprendre/`) : liste des modules → détail module → leçon → quiz.
- **Lecteur de leçon** : rendu des blocs (titres serif, paragraphes, citations encadrées) + bouton « Marquer comme terminé ».
- **Quiz interactif** : sélection, validation, correction colorée, explications, score, reprise. Meilleur score persisté.
- **Suivi de progression** (`src/store/progress.ts`, Zustand + AsyncStorage, compatible Expo Go) : barres de progression par module, compteur de leçons sur le Profil.
- **Gate Premium** pour les modules verrouillés (CTA vers Profil, paywall réel en S6).
- Nouveaux composants : `Button`, `ProgressBar`, `ContentScroll`.

**Dépendances ajoutées :** `zustand@5`, `@react-native-async-storage/async-storage`.

**Qualité :** `tsc` clean ✅ · `expo lint` clean ✅ · `expo export` (iOS) bundle sans erreur ✅.

---

## Sprint 3 — Pilier « Pratiquer » ✅

**Réalisé :**
- **Exercices guidés pas-à-pas** (`src/content/exercises.ts`) : *Préparation du matin*, *Dichotomie du contrôle*, *Examen du soir* (gratuits) ; *Premeditatio malorum*, *Vue d'en haut* (premium, gate). Runner avec progression, saisie par étape, sauvegarde auto dans le journal (`src/app/pratiquer/[exerciseId].tsx`).
- **Journal personnel chiffré** : clé AES aléatoire (`expo-crypto`) conservée dans `expo-secure-store`, entrées chiffrées en AES (`crypto-js`) avant écriture dans AsyncStorage — **compatible Expo Go**. Jamais persisté en clair. (`src/lib/crypto.ts`, `src/store/journal.ts`)
- **Stack Pratiquer** : catalogue → exercice / journal (liste, nouvelle entrée libre, détail + suppression confirmée).
- Déchiffrement/chargement du journal au démarrage (`_layout`).
- Carte « Rituel du moment » de l'Accueil reliée au bon exercice (matin/soir).
- Nouveaux : composant `Field`, helper `formatDate` (FR).

**Dépendances ajoutées :** `expo-secure-store`, `expo-crypto`, `crypto-js` (+ `@types/crypto-js`). Plugin `expo-secure-store` ajouté à `app.json`.

**Décision d'archi** : on reste sur **AsyncStorage chiffré** (Expo Go) ; migration vers SQLite chiffré différée.

**Qualité :** `tsc` clean ✅ · `expo lint` clean ✅ · `expo export` (iOS) sans erreur ✅.

---

## Sprint 4 — Pilier « Méditer » ✅

**Réalisé :**
- **Lecteur audio** (`expo-audio`, `src/components/meditation-player.tsx`) : play/pause, saut ±15 s, barre de progression, temps écoulé/total, fin de séance comptabilisée, indicateur « disponible hors-ligne ».
- **Respiration carrée animée** (`react-native-reanimated`, `src/components/breathing.tsx`) : cercle qui enfle/dégonfle, phases Inspire/Retiens/Expire (4-4-4-4), minuteur, comptabilisée.
- **Stack Méditer** (`src/app/mediter/`) : catalogue → lecteur audio / respiration / gate Premium.
- **Contenu** (`src/content/meditations.ts`) : méditations `audio` et `respiration` ; `AUDIO_SOURCES` embarqués (offline par nature), prêt pour les fichiers de l'auteur.
- **Placeholder** `assets/audio/instant.m4a` (silence 180 s, généré via afconvert) pour tester le lecteur en Expo Go — à remplacer par le vrai enregistrement (même nom).
- Suivi des méditations dans le store (compteur sur le Profil) ; cartes Accueil reliées.

**Dépendances ajoutées :** `expo-audio`, `expo-file-system`. Plugin `expo-audio` ajouté à `app.json`.

**Note offline** : les méditations embarquées sont offline par nature ; le téléchargement de contenu **distant** (Supabase Storage) sera branché au Sprint 6 (CMS).

**Qualité :** `tsc` clean ✅ · `expo lint` clean ✅ · `expo export` (iOS) sans erreur ✅.

---

## Sprint 5 — Onboarding, rappels & streak ✅

**Réalisé :**
- **Onboarding** (`src/components/onboarding.tsx`) : 4 slides de valeur + écran de **consentement RGPD** (analytics opt-in, journal local chiffré, pas de compte) + questionnaire (objectif + rappels). Affiché tant que non complété (gate dans `_layout`).
- **Préférences persistées** (`src/store/settings.ts`) : `onboarded`, `objectif`, `analytics`, `reminders` ; hydratation gérée (`onRehydrateStorage`) pour le routage initial.
- **Notifications locales** (`src/lib/notifications.ts`, `expo-notifications`) : rappels quotidiens matin/soir, demande de permission, canal Android, reprogrammation à chaque changement (effet dans `_layout`).
- **Écran de réglage des rappels** (Profil → Rappels) + éditeur réutilisable (`src/components/reminder-editor.tsx`, toggles + créneaux horaires).
- **Série (streak) réelle** : jours d'activité enregistrés à chaque leçon/quiz/méditation/entrée de journal (`activeDays` + `useStreak` dans le store progress) ; affichée sur Accueil & Profil.
- Profil converti en **stack** (index + rappels).

**Dépendances ajoutées :** `expo-notifications` (plugin auto). **Caveat** : notifications limitées sur Expo Go (SDK 53+) — pleinement fonctionnelles en dev/prod build.

**Qualité :** `tsc` clean ✅ · `expo lint` clean ✅ · `expo export` (iOS) sans erreur ✅.

---

## Prochains sprints (cf. planning §5 du rapport)
- S6 Paywall + RevenueCat + CMS Supabase
- S4 Méditer (lecteur audio + offline + respiration animée)
- S5 Onboarding + notifications + dashboard/streak réels
- S6 Paywall + RevenueCat + CMS Supabase
- S7 Polish, a11y, tests E2E
- S8 Builds EAS + soumission stores
