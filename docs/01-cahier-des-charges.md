# Cahier des charges — « Sous le portique »

**Application mobile de stoïcisme (iOS & Android)**
Version 1.0 — 28 juin 2026
Document de référence (Phase 1)

---

## 1. Vision & positionnement

**« Sous le portique »** (en écho à la *Stoa Poikilè*, le portique peint d'Athènes où enseignait Zénon) est une application mobile francophone qui rend le stoïcisme **vivant, pratiqué et quotidien**, et non seulement étudié.

Elle se distingue des apps de méditation génériques (Petit BamBou, Calm, Headspace) par un **ancrage philosophique rigoureux** : chaque exercice et chaque méditation est rattaché à une source identifiée (Épictète, Sénèque, Marc Aurèle, Musonius Rufus) et à l'interprétation des spécialistes modernes (Pierre Hadot, Maël Goarzin, Donald Robertson, le collectif StoaGallica).

**Promesse utilisateur :** « Comprendre le stoïcisme, puis le vivre — un exercice à la fois. »

### Trois piliers
1. **Apprendre** — parcours éducatif structuré sur le stoïcisme.
2. **Pratiquer** — exercices spirituels (*askesis*) inspirés de Hadot, Goarzin, Robertson et du stoïcisme impérial.
3. **Méditer** — méditations guidées audio et exercices contemplatifs.

---

## 2. Objectifs

| # | Objectif | Indicateur de succès (cible 12 mois) |
|---|----------|--------------------------------------|
| O1 | Proposer un parcours d'apprentissage complet et accessible | ≥ 60 % des utilisateurs terminent le module « Fondations » |
| O2 | Installer une pratique quotidienne | DAU/MAU ≥ 20 % ; ≥ 3 sessions/semaine pour les actifs |
| O3 | Convertir vers le premium | Taux de conversion free → payant ≥ 3–5 % |
| O4 | Fidéliser | Rétention J30 ≥ 25 % |
| O5 | Rigueur intellectuelle | Note stores ≥ 4,5 ; avis valorisant le sérieux des contenus |

---

## 3. Public cible & personas

- **Le curieux** (25–45 ans) : a entendu parler du stoïcisme (réseaux, livres de Robertson/Ferriss), veut une porte d'entrée sérieuse mais accessible.
- **Le praticien** (30–55 ans) : connaît les bases, cherche une discipline quotidienne structurée (journal, exercices).
- **L'étudiant / passionné de philosophie** : veut la profondeur, les sources, les références (Hadot).

Cible géographique au lancement : **francophonie** (France, Belgique, Suisse, Québec, Afrique francophone).

---

## 4. Périmètre fonctionnel

### 4.1 Pilier « Apprendre » (éducatif)

- **Parcours structuré en modules** progressifs :
  1. *Fondations* : qu'est-ce que le stoïcisme, contexte historique (Stoa, du Portique à Rome).
  2. *Les figures* : Zénon, Chrysippe, puis le stoïcisme impérial — Sénèque, Musonius Rufus, Épictète, Marc Aurèle.
  3. *Les concepts clés* : dichotomie du contrôle, les quatre vertus cardinales, *oikeiôsis*, *prohairesis*, représentations (*phantasiai*), le *logos*, l'*amor fati*, la *premeditatio malorum*.
  4. *Physique, logique, éthique* : les trois parties de la philosophie stoïcienne.
  5. *Le stoïcisme aujourd'hui* : Hadot et les « exercices spirituels », le renouveau moderne (Robertson, StoaGallica).
- **Format des leçons** : fiches courtes lisibles (5–8 min), citations sourcées, glossaire de termes grecs/latins, quiz de fin de module.
- **Suivi de progression** : modules complétés, badges, parcours recommandé.

### 4.2 Pilier « Pratiquer » (exercices spirituels)

Exercices structurés selon la typologie des **exercices spirituels** de Pierre Hadot, déclinés en pratiques concrètes (Goarzin, Robertson) :

- **Exercices du matin** : *praemeditatio* (préparation de la journée, anticipation des obstacles), intention vertueuse.
- **Exercices du soir** : examen de conscience (inspiré de Sénèque, *De Ira* III, 36), journal stoïcien.
- **Exercices d'attention (*prosochè*)** : rappels quotidiens, vigilance à l'instant présent.
- **Exercices sur les représentations** : distinguer le donné du jugement, suspension de l'assentiment.
- **Dichotomie du contrôle** (Épictète, *Manuel* I) : tri « dépend de moi / ne dépend pas de moi ».
- **Premeditatio malorum** : visualisation négative préparatoire.
- **Vue d'en haut** (Marc Aurèle / Hadot) : exercice de cosmologie contemplative.
- **Amor fati** : acceptation active.
- **Journal personnel** type *Pensées* de Marc Aurèle (carnet privé).

Caractéristiques transverses :
- Chaque exercice = objectif + source citée + déroulé guidé pas-à-pas + temps estimé + espace de saisie/journal.
- **Rituels quotidiens** : routine matin/soir paramétrable, rappels (notifications locales).
- **Citation du jour** sourcée.

### 4.3 Pilier « Méditer »

- **Méditations guidées audio** (voix française) : pleine conscience d'inspiration stoïcienne, contemplation de la vue d'en haut, méditation sur l'impermanence, ancrage dans l'instant.
- **Exercices de respiration** avec animation visuelle.
- **Sessions contemplatives sur citation** (lecture lente + temps de réflexion).
- Durées variables (3, 5, 10, 15 min) ; mode hors-ligne (audio téléchargeable).

### 4.4 Fonctions transverses

- Profil utilisateur, préférences, objectifs.
- Tableau de bord : série (*streak*), statistiques de pratique, progression.
- Notifications locales paramétrables (rappel matin/soir, citation du jour).
- Mode sombre / clair (cohérent avec l'esthétique sobre « marbre & portique »).
- Accessibilité (taille de police, contraste, VoiceOver/TalkBack).
- 100 % utilisable hors-ligne pour le contenu gratuit embarqué.

---

## 5. Modèle économique (freemium)

| | **Gratuit** | **Premium (abonnement)** |
|---|---|---|
| Apprendre | Module *Fondations* + concepts de base | Tous les modules + approfondissements |
| Pratiquer | 5–6 exercices fondamentaux + journal | Bibliothèque complète d'exercices + rituels avancés + historique illimité |
| Méditer | 2–3 méditations découverte | Toutes les méditations + téléchargement offline + nouvelles sorties mensuelles |
| Divers | Citation du jour | Statistiques avancées, thèmes, sans rappels limités |

- **Tarification cible** : mensuel ~4,99 €, annuel ~29,99 € (≈ 2,5 €/mois), essai gratuit 7 jours.
- **Facturation** : Apple App Store (StoreKit) & Google Play Billing — pas de paiement tiers (conformité stores).
- **Pas de publicité** (cohérent avec le positionnement premium/sérieux).

---

## 6. Parcours & arborescence (navigation)

Navigation principale par **onglets** :

```
[ Accueil ]  [ Apprendre ]  [ Pratiquer ]  [ Méditer ]  [ Profil ]
```

- **Accueil** : citation du jour, rituel du moment (matin/soir selon l'heure), reprise du dernier contenu, série en cours.
- **Apprendre** : liste des modules, progression.
- **Pratiquer** : exercices par catégorie, rituels, journal.
- **Méditer** : catalogue de méditations & respirations.
- **Profil** : statistiques, réglages, abonnement, à propos/sources.

---

## 7. Exigences non-fonctionnelles

- **Performance** : démarrage à froid < 2,5 s ; navigation fluide 60 fps.
- **Offline-first** : contenu gratuit et contenu premium téléchargé disponibles sans réseau.
- **Fiabilité** : aucune perte de données de journal (persistance locale chiffrée + sauvegarde optionnelle).
- **Compatibilité** : iOS 15+ / Android 8+ (API 26+).
- **Sécurité & vie privée** : données de journal sensibles → stockage local chiffré ; minimisation des données ; conformité **RGPD**.
- **Accessibilité** : WCAG AA, lecteurs d'écran, dynamic type.
- **Maintenabilité** : contenu découplé du code (format structuré JSON/MDX), mises à jour de contenu sans republication via le CMS léger.

---

## 8. Architecture technique cible

- **Front mobile** : **React Native + Expo** (SDK récent), TypeScript.
  - Navigation : Expo Router.
  - État : Zustand ou Redux Toolkit (à trancher en Phase 2).
  - Audio : `expo-av` / `expo-audio` (lecture + téléchargement offline).
  - Notifications locales : `expo-notifications`.
  - Stockage local : `expo-sqlite` / MMKV + chiffrement (`expo-secure-store` pour clés).
- **Contenu** : **embarqué** (bundle JSON/MDX + audios essentiels) pour l'offline + **CMS léger** distant pour mises à jour et nouveaux contenus.
  - Reco CMS : **Supabase** (Postgres + Storage pour audios + Auth) ou Firebase. Choix justifié en Phase 2.
- **Paiements** : `react-native-purchases` (**RevenueCat**) pour abstraire StoreKit/Play Billing et gérer les abonnements/essais.
- **Analytics & crash** : solution respectueuse vie privée (ex. PostHog/Amplitude + Sentry), opt-in.
- **CI/CD** : EAS Build & EAS Submit (Expo) pour les builds iOS/Android et soumission stores.

> Architecture détaillée, schéma de données et arbitrages définitifs : **livrés en Phase 2 (MVP & étude de faisabilité)**.

---

## 9. Contenu & sources

- **Sources primaires** : Sénèque (*Lettres à Lucilius*, *De la brièveté de la vie*, *De la colère*), Épictète (*Manuel*, *Entretiens*), Marc Aurèle (*Pensées*), Musonius Rufus (*Entretiens et fragments*).
- **Sources secondaires / cadre interprétatif** : Pierre Hadot (*Exercices spirituels et philosophie antique*, *La citadelle intérieure*), Maël Goarzin (pratique du quotidien, mode de vie philosophique), Donald Robertson (psychologie & stoïcisme, TCC), **StoaGallica** (ressources francophones).
- **Production de contenu** :
  - Textes : à rédiger/adapter par toi ou un rédacteur ; **citations primaires dans le domaine public** (œuvres antiques) — vigilance sur les **traductions** (droits d'auteur des traducteurs récents → privilégier traductions libres de droits ou commandées).
  - Audios de méditation : enregistrement voix FR (interne ou prestataire).
- **Charte éditoriale** : ton sobre, exigeant mais accessible ; toujours citer la source.

> ⚠️ **Point juridique clé** : les œuvres antiques sont libres de droits, **mais pas les traductions modernes ni les ouvrages de Hadot/Robertson/Goarzin**. Le contenu doit être **original ou correctement licencié**. À traiter dans l'étude de faisabilité (risque & coût).

---

## 10. Conformité & contraintes

- **RGPD** : consentement, politique de confidentialité, droit à l'effacement, minimisation. Journal intime = donnée sensible.
- **Guidelines stores** :
  - Apple : abonnements via StoreKit obligatoire ; pas de claims de santé non fondés ; section 3.1 (paiements).
  - Google Play : Play Billing obligatoire pour le numérique ; politique « Health ».
  - Éviter toute formulation thérapeutique/médicale (bien-être, pas soin médical).
- **Propriété intellectuelle** : voir §9.
- **Mentions** : crédits des sources, bibliographie dans l'app.

---

## 11. Hors périmètre (non-MVP)

- Compte multi-appareils avec synchronisation cloud complète (envisagé V2).
- Communauté / social / partage entre utilisateurs.
- Coaching IA conversationnel.
- Version anglaise et autres langues (i18n prévue dans l'archi mais contenu différé).
- Version web / desktop.
- Contenu vidéo.

---

## 12. Risques identifiés (synthèse — détaillés en Phase 2)

| Risque | Impact | Piste de mitigation |
|--------|--------|---------------------|
| Droits sur traductions/ouvrages secondaires | Élevé | Contenu original, traductions libres, licences |
| Production de contenu (volume, qualité, audio) | Élevé | Périmètre MVP restreint, planning de prod réaliste |
| Conversion freemium faible | Moyen | Valeur premium claire, essai gratuit, onboarding soigné |
| Saturation marché méditation | Moyen | Différenciation philosophique forte |
| Coûts récurrents (RevenueCat, Supabase, comptes dev) | Faible/Moyen | Offres gratuites au démarrage, montée en charge progressive |

---

## 13. Livrables & jalons

- **Phase 1 — Cahier des charges** ✅ (ce document) → *en attente de ta validation*.
- **Phase 2 — MVP + étude** : périmètre MVP détaillé, maquettes/flows, architecture technique définitive, planning, et **rapport faisabilité / fiabilité / rentabilité** (avec chiffrage).
- **Phase 3 — Développement** : par itérations, sur validation.

---

*Document de travail — à valider avant passage en Phase 2.*
