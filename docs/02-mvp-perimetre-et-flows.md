# Phase 2 — Périmètre MVP & parcours utilisateur

**« Sous le portique »** — Version 1.0 — 28 juin 2026

> Objectif du MVP : prouver la valeur (les 3 piliers fonctionnent et donnent envie de revenir) **et** la conversion premium, avec un volume de contenu **minimal mais crédible**.

---

## 1. Principe de cadrage MVP

Règle directrice : **profondeur sur peu de contenu** plutôt que largeur. On livre un parcours d'apprentissage complet *de bout en bout*, une poignée d'exercices vraiment soignés, et quelques méditations — pas un catalogue.

Le code supporte dès le MVP une **bibliothèque extensible** (le contenu est de la donnée) : ajouter un exercice ou une méditation après le lancement = ajouter une entrée dans le CMS, **pas** une release.

---

## 2. Contenu minimal du MVP

| Pilier | Gratuit (MVP) | Premium (MVP) | Volume total à produire |
|--------|---------------|---------------|--------------------------|
| **Apprendre** | Module 1 *Fondations* complet (6 leçons + quiz) | Modules 2 & 3 (figures impériales + concepts clés), ~12 leçons | ~18 leçons + 3 quiz |
| **Pratiquer** | Dichotomie du contrôle, Journal du soir, Citation du jour, Rituel matin simple (4) | Premeditatio malorum, Vue d'en haut, Examen de conscience guidé, Représentations, Amor fati (5) | 9 exercices guidés |
| **Méditer** | 3 méditations découverte (3/5/10 min) | 7 méditations + respiration guidée + offline | ~10 pistes audio |
| **Transverse** | Streak, notifications matin/soir, profil | Statistiques avancées, historique illimité du journal | — |

**Total contenu MVP** : ~18 leçons, 9 exercices, ~10 audios, ~60 citations sourcées.

---

## 3. Liste des écrans (≈ 22 écrans)

**Onboarding (4)**
1. Splash / accroche
2. Carrousel valeur (3 piliers) + consentement RGPD/analytics
3. Mini-questionnaire (objectif, niveau, horaires de rituel)
4. Proposition d'essai premium (soft, non bloquante)

**Accueil (1)**
5. Dashboard : citation du jour, rituel contextuel (matin/soir), reprise, streak

**Apprendre (4)**
6. Liste des modules + progression
7. Détail module (liste des leçons + quiz)
8. Lecteur de leçon (texte, citations, glossaire)
9. Quiz de fin de module

**Pratiquer (5)**
10. Catalogue d'exercices (catégories, cadenas premium)
11. Détail exercice (objectif + source)
12. Exercice guidé pas-à-pas (avec saisie)
13. Journal (liste des entrées)
14. Entrée de journal (éditeur)

**Méditer (3)**
15. Catalogue méditations + respiration
16. Lecteur audio (play, -15s/+15s, téléchargement offline)
17. Respiration guidée (animation)

**Profil & système (5)**
18. Profil / statistiques
19. Paramètres (notifications, thème, langue, confidentialité)
20. Paywall / abonnement (mensuel/annuel + essai)
21. À propos / sources & bibliographie
22. Gestion abonnement / restaurer achats

---

## 4. Parcours clés (flows)

### 4.1 Premier lancement → activation
`Splash → Carrousel → Consentement → Questionnaire → (Paywall soft, skippable) → Accueil`
Objectif : utilisateur arrive à l'Accueil avec un rituel proposé et 1 action immédiate (« Faire l'exercice du matin »).

### 4.2 Boucle d'engagement quotidienne
`Notification matin → Accueil → Rituel/Exercice du jour → complétion → streak +1`
`Notification soir → Journal du soir → entrée enregistrée`

### 4.3 Conversion premium
`Catalogue (contenu cadenassé) → tap contenu premium → Paywall → essai 7 j → achat`
Déclencheurs de paywall : contenu verrouillé, fin du module 1, 3e méditation conscommée.

### 4.4 Usage offline
`Méditer → télécharger une piste → lecture sans réseau` ; tout le contenu texte gratuit est embarqué.

---

## 5. Critères d'acceptation (Definition of Done MVP)

- [ ] Les 3 piliers sont navigables et fonctionnels de bout en bout.
- [ ] L'app fonctionne **100 % offline** pour tout le contenu gratuit + contenu premium téléchargé.
- [ ] L'achat d'abonnement (essai + mensuel + annuel) fonctionne en sandbox iOS & Android via RevenueCat, restauration incluse.
- [ ] Le journal est persistant et **chiffré localement** ; aucune perte de données.
- [ ] Notifications locales matin/soir paramétrables et fonctionnelles.
- [ ] Le contenu est servi depuis le bundle embarqué et **mis à jour depuis le CMS** sans republier.
- [ ] Accessibilité de base (dynamic type, contrastes, labels lecteurs d'écran).
- [ ] Conformité stores : paywall conforme, politique de confidentialité, pas de claim médical.
- [ ] Crash-free sessions ≥ 99,5 % (Sentry).

---

## 6. Hors MVP (rappel)

Sync cloud multi-appareils, communauté, IA conversationnelle, i18n/contenu EN, web, vidéo. → V2+.
