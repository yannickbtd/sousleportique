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

**Reste pour les prochains sprints** (cf. planning §5 du rapport) :
- S2 Apprendre (lecteur de leçon, quiz, progression)
- S3 Pratiquer (exercice guidé pas-à-pas, journal chiffré SQLite)
- S4 Méditer (lecteur audio + offline + respiration animée)
- S5 Onboarding + notifications + dashboard/streak réels
- S6 Paywall + RevenueCat + CMS Supabase
- S7 Polish, a11y, tests E2E
- S8 Builds EAS + soumission stores
