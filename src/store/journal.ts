/**
 * Journal personnel — chiffré au repos (AES via src/lib/crypto), stocké dans
 * AsyncStorage. En mémoire : entrées déchiffrées (jamais persistées en clair).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { decryptJSON, encryptJSON } from '@/lib/crypto';
import { useProgress } from '@/store/progress';

const STORAGE_KEY = 'slp.journal.v1';

export type JournalType = 'matin' | 'soir' | 'exercice' | 'libre';

export type JournalEntry = {
  id: string;
  type: JournalType;
  titre: string;
  contenu: string;
  exerciceId?: string;
  createdAt: number;
};

type NewEntry = Omit<JournalEntry, 'id' | 'createdAt'>;

type JournalState = {
  entries: JournalEntry[];
  hydrated: boolean;
  load: () => Promise<void>;
  add: (entry: NewEntry) => Promise<JournalEntry>;
  remove: (id: string) => Promise<void>;
};

async function persist(entries: JournalEntry[]): Promise<void> {
  const cipher = await encryptJSON(entries);
  await AsyncStorage.setItem(STORAGE_KEY, cipher);
}

export const useJournal = create<JournalState>((set, get) => ({
  entries: [],
  hydrated: false,
  load: async () => {
    if (get().hydrated) return;
    const cipher = await AsyncStorage.getItem(STORAGE_KEY);
    const entries = cipher ? await decryptJSON<JournalEntry[]>(cipher) : [];
    set({ entries: entries ?? [], hydrated: true });
  },
  add: async (entry) => {
    const created: JournalEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    };
    const entries = [created, ...get().entries];
    set({ entries });
    await persist(entries);
    useProgress.getState().recordActivity();
    return created;
  },
  remove: async (id) => {
    const entries = get().entries.filter((e) => e.id !== id);
    set({ entries });
    await persist(entries);
  },
}));
