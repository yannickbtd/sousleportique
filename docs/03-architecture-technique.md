# Phase 2 — Architecture technique définitive

**« Sous le portique »** — Version 1.0 — 28 juin 2026

---

## 1. Stack retenue

| Domaine | Choix | Justification |
|---------|-------|---------------|
| Framework | **React Native + Expo (SDK courant, managed workflow)** | Crossplatform iOS/Android, EAS Build/Submit, OTA updates |
| Langage | **TypeScript** (strict) | Sûreté de typage sur le contenu structuré |
| Navigation | **Expo Router** (file-based) | Standard Expo actuel, deep links natifs |
| État global | **Zustand** | Léger, simple, suffisant ici (pas de Redux nécessaire) |
| Données serveur / cache | **TanStack Query** | Cache, retry, sync CMS propre |
| Base locale | **expo-sqlite** (journal, progression, contenu téléchargé) | Robuste, requêtable, offline-first |
| Stockage clé/valeur | **MMKV** | Préférences rapides |
| Secrets / clés | **expo-secure-store** (Keychain/Keystore) | Chiffrement du journal |
| Audio | **expo-audio** | Lecture + téléchargement offline |
| Notifications | **expo-notifications** | Rappels locaux matin/soir |
| Paiements | **RevenueCat** (`react-native-purchases`) | Abstrait StoreKit/Play Billing, gère essais & restauration |
| CMS / backend | **Supabase** (Postgres + Storage + Auth anonyme) | Free tier généreux, MAJ contenu sans release |
| Crash | **Sentry** | Suivi fiabilité |
| Analytics | **PostHog** (opt-in) | Respect vie privée, RGPD |
| CI/CD | **EAS Build + EAS Submit** + OTA `expo-updates` | Builds & soumission stores automatisés |

---

## 2. Stratégie de contenu (embarqué + CMS)

```
                ┌─────────────────────────┐
                │   Supabase (CMS léger)   │
                │  Postgres + Storage(audio)│
                └────────────┬─────────────┘
                             │ (TanStack Query, au démarrage / pull-to-refresh)
                             ▼
   App ──► Contenu embarqué (bundle JSON/MDX + audios essentiels)  ◄── fallback offline
                             │
                             ▼
                expo-sqlite (cache contenu + téléchargements)
```

- **Au build** : le contenu MVP (leçons, exercices, citations, 3 audios gratuits) est **embarqué** → app utilisable dès l'installation, offline.
- **Au runtime** : l'app interroge le CMS pour récupérer le contenu plus récent (nouveaux exercices/méditations) et le met en cache dans SQLite.
- **Versionnement de contenu** : chaque entité a `version` + `updatedAt` → diff incrémental.
- **Audios premium** : stockés sur Supabase Storage, **téléchargeables** pour l'offline.

---

## 3. Modèle de données (CMS + local)

**Contenu (CMS, lecture seule côté app)**
```
modules        (id, ordre, titre, description, premium:boolean, version)
lessons        (id, module_id, ordre, titre, corps_mdx, premium, version)
quizzes        (id, module_id, questions[jsonb])
exercises      (id, categorie, titre, objectif, source_ref, etapes[jsonb], premium, version)
meditations    (id, titre, duree_s, audio_path, transcript, premium, version)
citations      (id, texte, auteur, oeuvre, ref)
```

**Données utilisateur (local, SQLite, chiffré)**
```
journal_entries   (id, date, type:matin|soir|exercice|libre, exercice_id?, contenu, created_at)
progress          (lesson_id|module_id|meditation_id, status, completed_at)
streaks           (date, completed:boolean)
settings          (cle, valeur)            -- MMKV
downloads         (meditation_id, local_path, downloaded_at)
```

> Le journal **ne quitte pas l'appareil** au MVP (pas de cloud). Donnée intime = chiffrée localement. Sauvegarde cloud chiffrée = V2 optionnelle.

---

## 4. Structure de projet (Expo Router)

```
sous-le-portique/
├── app/                       # routes (Expo Router)
│   ├── (onboarding)/
│   ├── (tabs)/
│   │   ├── index.tsx          # Accueil
│   │   ├── apprendre/
│   │   ├── pratiquer/
│   │   ├── mediter/
│   │   └── profil/
│   ├── paywall.tsx
│   └── _layout.tsx
├── src/
│   ├── components/            # UI réutilisable
│   ├── features/              # logique par pilier (learn, practice, meditate)
│   ├── content/               # contenu embarqué (JSON/MDX) + loader
│   ├── data/                  # SQLite, repositories, sync CMS
│   ├── store/                 # Zustand
│   ├── services/              # purchases (RevenueCat), notifications, audio, analytics
│   ├── theme/                 # design system (clair/sombre, typo, couleurs)
│   └── lib/                   # utils, crypto
├── assets/                    # polices, images, audios embarqués
├── docs/                      # ce dossier
├── app.json / eas.json
└── package.json
```

---

## 5. Sécurité & conformité (technique)

- Journal chiffré : clé en `secure-store`, contenu chiffré avant écriture SQLite.
- Pas de PII envoyée sans consentement ; analytics opt-in.
- Politique de confidentialité + écran de consentement (RGPD).
- Auth Supabase **anonyme** au MVP (pas de compte requis) → pas de collecte d'email obligatoire.
- Conformité paiements : 100 % via stores (RevenueCat), aucun lien de paiement externe dans l'app.

---

## 6. Qualité & fiabilité

- **Tests** : Jest (logique/repositories) + React Native Testing Library (composants clés) + Maestro (E2E des flows critiques : onboarding, achat, exercice, offline).
- **Lint/format** : ESLint + Prettier + TypeScript strict, hooks pre-commit.
- **CI** : lint + tests + build EAS sur PR.
- **Monitoring** : Sentry (crash) + PostHog (funnels activation/conversion).
- **OTA** : correctifs JS poussés via `expo-updates` sans repasser par la review store.

---

## 7. Environnements

- `dev` (Expo Go / dev client) → `staging` (TestFlight / Play Internal Testing) → `prod`.
- Variables d'env via EAS secrets (clés Supabase, RevenueCat, Sentry, PostHog).
