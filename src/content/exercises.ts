/**
 * Exercices spirituels (pilier « Pratiquer »).
 * Inspirés de Hadot (exercices spirituels), Goarzin (pratique du quotidien),
 * Robertson (mise en œuvre) et du stoïcisme impérial. Textes FR originaux.
 */
import type { JournalType } from '@/store/journal';

export type ExerciseStep = {
  titre: string;
  /** Texte d'accompagnement / consigne. */
  instruction: string;
  /** Si défini, l'étape propose un champ de saisie avec ce libellé. */
  prompt?: string;
};

export type Exercise = {
  id: string;
  titre: string;
  source: string;
  glyph: string;
  premium: boolean;
  duree: string;
  intro: string;
  /** Type d'entrée de journal créée à la fin. */
  journalType: JournalType;
  steps: ExerciseStep[];
};

export const EXERCISES: Exercise[] = [
  {
    id: 'matin',
    titre: 'Préparation du matin',
    source: 'Praemeditatio — esprit de Marc Aurèle, Pensées II, 1',
    glyph: '🌅',
    premium: false,
    duree: '4 min',
    intro:
      "Avant que la journée ne t'emporte, prends un instant pour la regarder en face et fixer ton intention.",
    journalType: 'matin',
    steps: [
      {
        titre: 'Anticiper',
        instruction:
          "Dès l'aube, dis-toi : je rencontrerai peut-être l'ingratitude, l'impatience, l'injustice. Rien de cela ne peut atteindre ma volonté de bien agir.",
        prompt: "Quel obstacle pourrais-tu rencontrer aujourd'hui ?",
      },
      {
        titre: 'Choisir une vertu',
        instruction:
          'Une journée se tient par une intention. Sagesse, courage, justice, tempérance : laquelle veux-tu incarner ?',
        prompt: 'Quelle vertu veux-tu pratiquer aujourd’hui ?',
      },
      {
        titre: 'Se rappeler l’essentiel',
        instruction:
          "Ce qui dépend de toi : tes jugements et tes actes. Le reste suivra son cours. Avance avec cela en tête.",
      },
    ],
  },
  {
    id: 'dichotomie',
    titre: 'La dichotomie du contrôle',
    source: 'Épictète, Manuel I',
    glyph: '⚖️',
    premium: false,
    duree: '5 min',
    intro:
      "Le trouble naît quand on s'attache à ce qu'on ne maîtrise pas. Trie, et retrouve la tranquillité.",
    journalType: 'exercice',
    steps: [
      {
        titre: 'La situation',
        instruction: 'Pense à une chose qui te préoccupe en ce moment.',
        prompt: 'Quelle situation te pèse ?',
      },
      {
        titre: 'Ce qui ne dépend pas de toi',
        instruction:
          "Dans cette situation, qu'est-ce qui échappe à ton pouvoir ? L'opinion d'autrui, le passé, les résultats…",
        prompt: 'Ce qui ne dépend pas de toi :',
      },
      {
        titre: 'Ce qui dépend de toi',
        instruction:
          'Tes jugements, ton attitude, tes choix. Voilà ton vrai terrain d’action.',
        prompt: 'Ce qui dépend de toi :',
      },
      {
        titre: 'Agir',
        instruction:
          'Puisque tu sais maintenant où porte ton pouvoir, quelle action juste peux-tu poser ?',
        prompt: 'Quelle action vertueuse vas-tu poser ?',
      },
    ],
  },
  {
    id: 'examen-soir',
    titre: 'Examen du soir',
    source: 'Sénèque, De la colère III, 36',
    glyph: '🕯️',
    premium: false,
    duree: '5 min',
    intro:
      "Chaque soir, Sénèque passait sa journée en revue devant lui-même. Sans complaisance, mais sans dureté.",
    journalType: 'soir',
    steps: [
      {
        titre: 'Ce qui fut bien',
        instruction: "Qu'as-tu fait aujourd'hui en accord avec la raison et la vertu ?",
        prompt: "Qu'ai-je bien fait aujourd'hui ?",
      },
      {
        titre: 'Ce qui peut grandir',
        instruction: "Où as-tu manqué ? Note-le comme un médecin note un symptôme : pour soigner.",
        prompt: "Qu'aurais-je pu mieux faire ?",
      },
      {
        titre: 'Demain',
        instruction: 'Que vas-tu t’efforcer de faire demain ?',
        prompt: 'Mon intention pour demain :',
      },
    ],
  },
  {
    id: 'premeditatio',
    titre: 'Premeditatio malorum',
    source: 'Visualisation négative préparatoire',
    glyph: '⛰️',
    premium: true,
    duree: '6 min',
    intro: 'Imaginer calmement l’adversité pour ne plus la craindre.',
    journalType: 'exercice',
    steps: [
      { titre: 'Aperçu', instruction: 'Exercice réservé aux membres Premium.' },
    ],
  },
  {
    id: 'vue-den-haut',
    titre: "La vue d'en haut",
    source: 'Marc Aurèle / Pierre Hadot',
    glyph: '🌌',
    premium: true,
    duree: '8 min',
    intro: 'Contempler sa vie depuis les hauteurs du cosmos.',
    journalType: 'exercice',
    steps: [
      { titre: 'Aperçu', instruction: 'Exercice réservé aux membres Premium.' },
    ],
  },
];

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
