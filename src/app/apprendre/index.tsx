import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { MODULES } from '@/content/modules';
import { Spacing } from '@/constants/theme';
import { useModuleProgress } from '@/store/progress';

function ModuleCard({ id }: { id: string }) {
  const router = useRouter();
  const mod = MODULES.find((m) => m.id === id)!;
  const { done, total, ratio } = useModuleProgress(id);

  return (
    <Card
      glyph={mod.glyph}
      title={mod.titre}
      subtitle={mod.resume}
      badge={mod.premium ? 'Premium' : 'Gratuit'}
      locked={mod.premium}
      onPress={() => router.push({ pathname: '/apprendre/[moduleId]', params: { moduleId: id } })}
      footer={
        !mod.premium && total > 0 ? (
          <View style={styles.progress}>
            <ProgressBar ratio={ratio} />
            <ThemedText themeColor="textSecondary" type="small">
              {done} / {total} leçons
            </ThemedText>
          </View>
        ) : undefined
      }
    />
  );
}

export default function ApprendreScreen() {
  return (
    <Screen title="Apprendre" subtitle="Comprendre le stoïcisme, pas à pas, avec ses sources.">
      {MODULES.map((m) => (
        <ModuleCard key={m.id} id={m.id} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: { gap: Spacing.one, marginTop: Spacing.two },
});
