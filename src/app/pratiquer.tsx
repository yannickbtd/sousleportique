import { Card } from '@/components/card';
import { Screen } from '@/components/screen';

type Exercice = {
  id: string;
  titre: string;
  source: string;
  glyph: string;
  premium: boolean;
};

// Placeholder Sprint 1 — exercices spirituels (Hadot / Goarzin / Robertson / stoïcisme impérial).
const EXERCICES: Exercice[] = [
  {
    id: 'dichotomie',
    titre: 'La dichotomie du contrôle',
    source: 'Épictète, Manuel I',
    glyph: '⚖️',
    premium: false,
  },
  {
    id: 'journal-soir',
    titre: 'Examen du soir',
    source: 'Sénèque, De la colère III, 36',
    glyph: '🕯️',
    premium: false,
  },
  {
    id: 'premeditatio',
    titre: 'Premeditatio malorum',
    source: 'Visualisation négative préparatoire',
    glyph: '⛰️',
    premium: true,
  },
  {
    id: 'vue-den-haut',
    titre: "La vue d'en haut",
    source: 'Marc Aurèle / Pierre Hadot',
    glyph: '🌌',
    premium: true,
  },
];

export default function PratiquerScreen() {
  return (
    <Screen
      title="Pratiquer"
      subtitle="Les exercices spirituels pour vivre le stoïcisme au quotidien.">
      <Card
        glyph="📔"
        title="Mon journal"
        subtitle="Tes réflexions, à la manière des Pensées. Privé et chiffré."
        badge="Ouvrir"
      />
      {EXERCICES.map((e) => (
        <Card
          key={e.id}
          glyph={e.glyph}
          title={e.titre}
          subtitle={e.source}
          badge={e.premium ? 'Premium' : 'Gratuit'}
          locked={e.premium}
        />
      ))}
    </Screen>
  );
}
