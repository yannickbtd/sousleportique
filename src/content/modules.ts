/**
 * Contenu pédagogique du pilier « Apprendre ».
 * Textes en formulations françaises originales (pas de citation de traductions
 * modernes sous droits). À terme : servi par le CMS léger + fallback embarqué.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'quote'; text: string; source: string };

export type Lesson = {
  id: string;
  titre: string;
  duree: string;
  blocks: Block[];
};

export type GlossaireTerme = { terme: string; definition: string };

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number; // index de la bonne réponse
  explication?: string;
};

export type Module = {
  id: string;
  titre: string;
  resume: string;
  glyph: string;
  premium: boolean;
  lessons: Lesson[];
  glossaire: GlossaireTerme[];
  quiz: QuizQuestion[];
};

const FONDATIONS: Module = {
  id: 'fondations',
  titre: 'Fondations',
  resume: "Qu'est-ce que le stoïcisme ? Du Portique d'Athènes à Rome.",
  glyph: '🏛️',
  premium: false,
  lessons: [
    {
      id: 'le-portique',
      titre: 'Le Portique : naissance d’une école',
      duree: '5 min',
      blocks: [
        { type: 'h', text: 'Une philosophie née sous un porche' },
        {
          type: 'p',
          text: "Vers 301 avant notre ère, à Athènes, un marchand devenu philosophe, Zénon de Cittium, se met à enseigner sous un portique peint qui bordait l'agora : la Stoa Poikilè. C'est de ce lieu — la stoa — que l'école tire son nom. Le stoïcisme n'est donc pas d'abord une doctrine abstraite, mais une parole publique, offerte à qui passait.",
        },
        {
          type: 'p',
          text: "Après Zénon viennent Cléanthe puis Chrysippe, qui systématise la pensée de l'école. On parle d'« ancien stoïcisme » pour cette période grecque, par distinction avec le stoïcisme impérial romain (Sénèque, Épictète, Marc Aurèle) que tu découvriras plus loin.",
        },
        {
          type: 'quote',
          text: "Le but de la vie est de vivre en accord — avec soi-même, avec la raison, avec la nature.",
          source: 'D’après Zénon de Cittium',
        },
      ],
    },
    {
      id: 'vivre-selon-la-nature',
      titre: 'Vivre selon la nature',
      duree: '5 min',
      blocks: [
        { type: 'h', text: 'La nature, c’est la raison' },
        {
          type: 'p',
          text: "« Vivre selon la nature » est la formule fondatrice du stoïcisme. Elle ne signifie pas retourner aux bois, mais vivre selon ce qui fait notre nature propre d'êtres humains : la raison (logos). L'univers entier est gouverné par cette même raison ; vivre avec sagesse, c'est s'accorder à l'ordre rationnel du monde.",
        },
        {
          type: 'p',
          text: "De là découle l'idée que rien d'extérieur n'est, en soi, un bien ou un mal. Santé, richesse, réputation sont des « indifférents » : préférables peut-être, mais non décisifs pour une vie réussie. Seule compte la qualité de notre âme — notre manière de juger et d'agir.",
        },
      ],
    },
    {
      id: 'ce-qui-depend-de-nous',
      titre: 'Ce qui dépend de nous',
      duree: '6 min',
      blocks: [
        { type: 'h', text: 'La dichotomie du contrôle' },
        {
          type: 'p',
          text: "Le cœur pratique du stoïcisme tient en une distinction : certaines choses dépendent de nous, d'autres non. Dépendent de nous nos jugements, nos désirs, nos actions — bref, l'usage que nous faisons de notre faculté de choix. Ne dépendent pas de nous le corps, les biens, la réputation, l'opinion d'autrui, le cours des événements.",
        },
        {
          type: 'quote',
          text: "Ce ne sont pas les choses qui nous troublent, mais les jugements que nous portons sur elles.",
          source: 'D’après Épictète, Manuel',
        },
        {
          type: 'p',
          text: "Toute la liberté, et toute la tranquillité, viennent de placer son effort là où il porte vraiment : sur ce qui nous appartient en propre. S'inquiéter du reste, c'est se rendre esclave de ce qu'on ne maîtrise pas.",
        },
      ],
    },
    {
      id: 'la-vertu-seul-bien',
      titre: 'La vertu, seul bien véritable',
      duree: '6 min',
      blocks: [
        { type: 'h', text: 'Les quatre vertus cardinales' },
        {
          type: 'p',
          text: "Pour les stoïciens, le seul bien authentique est la vertu (aretê), c'est-à-dire l'excellence du caractère. Elle se décline en quatre vertus cardinales : la sagesse (savoir discerner), le courage (tenir face à l'adversité), la justice (rendre à chacun son dû) et la tempérance (la juste mesure dans les désirs).",
        },
        {
          type: 'p',
          text: "Le bonheur (eudaimonia) n'est pas une récompense extérieure : il est l'état d'une âme qui agit avec vertu, quoi qu'il arrive. C'est pourquoi le sage stoïcien peut rester serein même dans l'épreuve — non par insensibilité, mais parce que son bien ne dépend de personne d'autre que lui.",
        },
        {
          type: 'quote',
          text: "Aucun vent n'est favorable à qui ne sait où il va. Fixe ton cap : la vertu.",
          source: 'Esprit de Sénèque, Lettres à Lucilius',
        },
      ],
    },
  ],
  glossaire: [
    { terme: 'Logos', definition: "La raison universelle qui ordonne le monde, et la raison en l'homme." },
    { terme: 'Aretê (vertu)', definition: "L'excellence du caractère ; le seul bien véritable selon les stoïciens." },
    { terme: 'Eudaimonia', definition: "Le bonheur compris comme épanouissement d'une vie vertueuse." },
    { terme: 'Indifférents', definition: "Ce qui n'est ni bien ni mal en soi (santé, richesse, réputation)." },
    { terme: 'Prohairesis', definition: "La faculté de choix, le siège de notre liberté intérieure." },
  ],
  quiz: [
    {
      id: 'q1',
      question: "D'où vient le nom « stoïcisme » ?",
      options: [
        "Du nom de son fondateur, Stoïkos",
        "Du portique (stoa) où enseignait Zénon",
        "D'un mot grec signifiant « patience »",
      ],
      correct: 1,
      explication: "L'école tire son nom de la Stoa Poikilè, le portique peint d'Athènes.",
    },
    {
      id: 'q2',
      question: "Que signifie « vivre selon la nature » ?",
      options: [
        "Vivre au contact de la nature sauvage",
        "Suivre ses instincts sans contrainte",
        "Vivre en accord avec la raison",
      ],
      correct: 2,
      explication: "La nature propre de l'homme est la raison (logos).",
    },
    {
      id: 'q3',
      question: "Selon la dichotomie du contrôle, qu'est-ce qui dépend de nous ?",
      options: [
        "Notre réputation et nos biens",
        "Nos jugements, désirs et actions",
        "Le cours des événements",
      ],
      correct: 1,
      explication: "Seul l'usage de notre faculté de choix dépend pleinement de nous.",
    },
    {
      id: 'q4',
      question: "Quel est, pour les stoïciens, le seul bien véritable ?",
      options: ['La santé', 'La vertu', 'La richesse'],
      correct: 1,
      explication: "Santé et richesse ne sont que des « indifférents » ; seule la vertu est un bien.",
    },
  ],
};

const FIGURES: Module = {
  id: 'figures',
  titre: 'Les figures impériales',
  resume: 'Sénèque, Musonius Rufus, Épictète, Marc Aurèle.',
  glyph: '👤',
  premium: true,
  lessons: [
    {
      id: 'apercu',
      titre: 'Aperçu du stoïcisme impérial',
      duree: '5 min',
      blocks: [
        {
          type: 'p',
          text: "À Rome, le stoïcisme devient un art de vivre incarné par quatre grandes figures : Sénèque le conseiller, Musonius Rufus le maître, Épictète l'ancien esclave devenu professeur, et Marc Aurèle l'empereur philosophe. (Contenu complet réservé aux membres.)",
        },
      ],
    },
  ],
  glossaire: [],
  quiz: [],
};

const CONCEPTS: Module = {
  id: 'concepts',
  titre: 'Les concepts clés',
  resume: 'Dichotomie du contrôle, vertus, représentations, amor fati.',
  glyph: '🔑',
  premium: true,
  lessons: [
    {
      id: 'apercu',
      titre: 'Les grands concepts',
      duree: '5 min',
      blocks: [
        {
          type: 'p',
          text: "Représentations (phantasiai), assentiment, premeditatio malorum, amor fati, vue d'en haut… autant d'outils pour penser et agir en stoïcien. (Contenu complet réservé aux membres.)",
        },
      ],
    },
  ],
  glossaire: [],
  quiz: [],
};

export const MODULES: Module[] = [FONDATIONS, FIGURES, CONCEPTS];

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
  return getModule(moduleId)?.lessons.find((l) => l.id === lessonId);
}
