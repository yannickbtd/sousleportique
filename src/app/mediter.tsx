import { Card } from '@/components/card';
import { Screen } from '@/components/screen';

type Meditation = {
  id: string;
  titre: string;
  duree: string;
  glyph: string;
  premium: boolean;
};

// Placeholder Sprint 1 — les fichiers audio (MP3) seront fournis et placés dans assets/audio/.
const MEDITATIONS: Meditation[] = [
  { id: 'instant', titre: "Ancrage dans l'instant", duree: '3 min', glyph: '🍃', premium: false },
  { id: 'respiration', titre: 'Respiration guidée', duree: '5 min', glyph: '🌬️', premium: false },
  { id: 'vue-haut', titre: "La vue d'en haut", duree: '10 min', glyph: '🌌', premium: true },
  { id: 'impermanence', titre: "Méditer l'impermanence", duree: '12 min', glyph: '⏳', premium: true },
];

export default function MediterScreen() {
  return (
    <Screen
      title="Méditer"
      subtitle="Des méditations guidées d'inspiration stoïcienne. Disponibles hors-ligne.">
      {MEDITATIONS.map((m) => (
        <Card
          key={m.id}
          glyph={m.glyph}
          title={m.titre}
          subtitle={m.duree}
          badge={m.premium ? 'Premium' : 'Gratuit'}
          locked={m.premium}
        />
      ))}
    </Screen>
  );
}
