/**
 * Citations sourcées — formulations françaises originales (paraphrases) afin d'éviter
 * tout problème de droits sur les traductions modernes. Les œuvres sont du domaine public ;
 * seules leurs traductions récentes sont protégées.
 *
 * À terme : ce contenu sera servi par le CMS léger (Supabase) + fallback embarqué.
 */

export type Citation = {
  id: string;
  texte: string;
  auteur: string;
  oeuvre: string;
  ref: string;
};

export const CITATIONS: Citation[] = [
  {
    id: 'epictete-manuel-1',
    texte:
      "Il y a ce qui dépend de nous et ce qui n'en dépend pas. Tourne ton effort vers ce qui t'appartient en propre.",
    auteur: 'Épictète',
    oeuvre: 'Manuel',
    ref: 'I',
  },
  {
    id: 'marc-aurele-pensees-2',
    texte:
      "Tu as le pouvoir, à tout instant, de te retirer en toi-même : nul lieu n'est plus calme que ta propre âme.",
    auteur: 'Marc Aurèle',
    oeuvre: 'Pensées',
    ref: 'IV, 3',
  },
  {
    id: 'seneque-brievete-1',
    texte:
      "Ce n'est pas que nous ayons peu de temps : c'est que nous en perdons beaucoup. La vie est assez longue pour qui sait l'employer.",
    auteur: 'Sénèque',
    oeuvre: 'De la brièveté de la vie',
    ref: 'I',
  },
  {
    id: 'marc-aurele-pensees-5',
    texte: "Que ta seule joie et ton seul repos soient de passer d'un acte utile à autrui à un autre.",
    auteur: 'Marc Aurèle',
    oeuvre: 'Pensées',
    ref: 'VI, 7',
  },
  {
    id: 'epictete-entretiens-1',
    texte:
      "Ce ne sont pas les choses qui troublent les hommes, mais les jugements qu'ils portent sur les choses.",
    auteur: 'Épictète',
    oeuvre: 'Manuel',
    ref: 'V',
  },
];

/** Citation du jour, déterministe selon la date (même citation toute la journée). */
export function citationDuJour(date = new Date()): Citation {
  const jour = Math.floor(date.getTime() / 86_400_000);
  return CITATIONS[jour % CITATIONS.length];
}
