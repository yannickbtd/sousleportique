import { useRouter } from 'expo-router';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { MEDITATIONS } from '@/content/meditations';
import { useProgress } from '@/store/progress';

function MeditationCard({ id }: { id: string }) {
  const router = useRouter();
  const med = MEDITATIONS.find((m) => m.id === id)!;
  const done = useProgress((s) => Boolean(s.meditationsDone[id]));

  return (
    <Card
      glyph={done ? '✅' : med.glyph}
      title={med.titre}
      subtitle={`${med.kind === 'respiration' ? 'Respiration' : 'Audio'} · ${med.dureeLabel}`}
      badge={med.premium ? 'Premium' : 'Gratuit'}
      locked={med.premium}
      onPress={() =>
        router.push({ pathname: '/mediter/[meditationId]', params: { meditationId: id } })
      }
    />
  );
}

export default function MediterScreen() {
  return (
    <Screen
      title="Méditer"
      subtitle="Des méditations guidées d'inspiration stoïcienne. Disponibles hors-ligne.">
      {MEDITATIONS.map((m) => (
        <MeditationCard key={m.id} id={m.id} />
      ))}
    </Screen>
  );
}
