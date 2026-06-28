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

## Prochains sprints (cf. planning §5 du rapport)
- S3 Pratiquer (exercice guidé pas-à-pas, journal chiffré SQLite)
- S4 Méditer (lecteur audio + offline + respiration animée)
- S5 Onboarding + notifications + dashboard/streak réels
- S6 Paywall + RevenueCat + CMS Supabase
- S7 Polish, a11y, tests E2E
- S8 Builds EAS + soumission stores
