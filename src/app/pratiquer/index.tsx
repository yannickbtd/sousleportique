import { useRouter } from 'expo-router';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { EXERCISES } from '@/content/exercises';
import { useJournal } from '@/store/journal';

export default function PratiquerScreen() {
  const router = useRouter();
  const count = useJournal((s) => s.entries.length);

  return (
    <Screen
      title="Pratiquer"
      subtitle="Les exercices spirituels pour vivre le stoïcisme au quotidien.">
      <Card
        glyph="📔"
        title="Mon journal"
        subtitle={count > 0 ? `${count} entrée${count > 1 ? 's' : ''} · privé et chiffré` : 'Privé et chiffré'}
        badge="Ouvrir"
        onPress={() => router.push('/pratiquer/journal')}
      />

      <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>Exercices</ThemedText>
      {EXERCISES.map((e) => (
        <Card
          key={e.id}
          glyph={e.glyph}
          title={e.titre}
          subtitle={`${e.source} · ${e.duree}`}
          badge={e.premium ? 'Premium' : 'Gratuit'}
          locked={e.premium}
          onPress={() =>
            router.push({ pathname: '/pratiquer/[exerciseId]', params: { exerciseId: e.id } })
          }
        />
      ))}
    </Screen>
  );
}
