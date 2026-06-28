import { Card } from '@/components/card';
import { Screen } from '@/components/screen';

type Module = {
  id: string;
  titre: string;
  resume: string;
  glyph: string;
  premium: boolean;
};

// Placeholder Sprint 1 — sera servi par le CMS + contenu embarqué.
const MODULES: Module[] = [
  {
    id: 'fondations',
    titre: 'Fondations',
    resume: "Qu'est-ce que le stoïcisme ? Du Portique d'Athènes à Rome.",
    glyph: '🏛️',
    premium: false,
  },
  {
    id: 'figures',
    titre: 'Les figures impériales',
    resume: 'Sénèque, Musonius Rufus, Épictète, Marc Aurèle.',
    glyph: '👤',
    premium: true,
  },
  {
    id: 'concepts',
    titre: 'Les concepts clés',
    resume: 'Dichotomie du contrôle, vertus, représentations, amor fati.',
    glyph: '🔑',
    premium: true,
  },
];

export default function ApprendreScreen() {
  return (
    <Screen
      title="Apprendre"
      subtitle="Comprendre le stoïcisme, pas à pas, avec ses sources.">
      {MODULES.map((m) => (
        <Card
          key={m.id}
          glyph={m.glyph}
          title={m.titre}
          subtitle={m.resume}
          badge={m.premium ? 'Premium' : 'Gratuit'}
          locked={m.premium}
        />
      ))}
    </Screen>
  );
}
