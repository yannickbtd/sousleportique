# Méditations audio

Placez ici les fichiers audio des méditations guidées (fournis par l'auteur).

- **Format** : `.m4a` (AAC, recommandé) ou `.mp3`.
- **Nommage** : `<id-meditation>.m4a` (ex. `instant.m4a`, `vue-den-haut.m4a`).
- Après ajout d'un fichier, déclarez-le dans `src/content/meditations.ts` →
  `AUDIO_SOURCES` : `"<id>": require('@/assets/audio/<id>.m4a')`.

Les fichiers embarqués sont **disponibles hors-ligne** par nature.

> `instant.m4a` est actuellement un **placeholder silencieux** (180 s) généré pour
> tester le lecteur. Remplacez-le par l'enregistrement définitif (même nom).
