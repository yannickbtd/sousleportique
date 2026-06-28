import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useJournal } from '@/store/journal';

export default function NewEntryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const add = useJournal((s) => s.add);

  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');

  async function save() {
    if (!contenu.trim()) {
      router.back();
      return;
    }
    await add({
      type: 'libre',
      titre: titre.trim() || 'Pensée',
      contenu: contenu.trim(),
    });
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: 'Nouvelle entrée' }} />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + BottomTabInset + Spacing.four },
        ]}>
        <View style={styles.inner}>
          <Field label="Titre (optionnel)" value={titre} onChangeText={setTitre} multiline={false} placeholder="Une pensée du jour" />
          <Field
            label="Texte"
            value={contenu}
            onChangeText={setContenu}
            placeholder="Écris librement, à la manière des Pensées…"
            minHeight={220}
          />
          <Button label="Enregistrer" onPress={save} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  inner: { width: '100%', maxWidth: MaxContentWidth, gap: Spacing.three },
});
