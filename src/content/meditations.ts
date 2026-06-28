/**
 * Méditations (pilier « Méditer »).
 * `kind: 'audio'` → lecteur audio ; `kind: 'respiration'` → exercice de respiration animé.
 *
 * Sources audio : fichiers fournis par l'auteur dans assets/audio/ (voir AUDIO_SOURCES).
 * Les `require(...)` doivent pointer vers des fichiers existants (sinon le bundle échoue),
 * donc seules les méditations dont le fichier est présent sont déclarées ici.
 */

export type MeditationKind = 'audio' | 'respiration';

export type Meditation = {
  id: string;
  titre: string;
  glyph: string;
  premium: boolean;
  dureeLabel: string;
  kind: MeditationKind;
  description: string;
};

export const MEDITATIONS: Meditation[] = [
  {
    id: 'instant',
    titre: "Ancrage dans l'instant",
    glyph: '🍃',
    premium: false,
    dureeLabel: '3 min',
    kind: 'audio',
    description:
      "Revenir au seul moment qui nous appartienne : maintenant. Une porte d'entrée douce vers l'attention stoïcienne (prosochè).",
  },
  {
    id: 'respiration',
    titre: 'Respiration guidée',
    glyph: '🌬️',
    premium: false,
    dureeLabel: '5 min',
    kind: 'respiration',
    description: 'Un rythme simple — inspirer, retenir, expirer — pour apaiser le souffle et l’esprit.',
  },
  {
    id: 'vue-den-haut',
    titre: "La vue d'en haut",
    glyph: '🌌',
    premium: true,
    dureeLabel: '10 min',
    kind: 'audio',
    description: "Contempler sa vie depuis les hauteurs du cosmos, à la manière de Marc Aurèle.",
  },
  {
    id: 'impermanence',
    titre: "Méditer l'impermanence",
    glyph: '⏳',
    premium: true,
    dureeLabel: '12 min',
    kind: 'audio',
    description: 'Accueillir le flux des choses, sans s’y agripper.',
  },
];

/**
 * Sources audio embarquées (offline par nature). Ajoute une entrée quand le MP3/M4A
 * correspondant est déposé dans assets/audio/ : `<id>: require('@/assets/audio/<id>.m4a')`.
 */
export const AUDIO_SOURCES: Record<string, number> = {
  instant: require('@/assets/audio/instant.m4a'),
};

export function getMeditation(id: string): Meditation | undefined {
  return MEDITATIONS.find((m) => m.id === id);
}
