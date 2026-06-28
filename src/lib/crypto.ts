/**
 * Chiffrement local du journal — compatible Expo Go (aucun module natif AES).
 * - Une clé AES aléatoire est générée une fois (expo-crypto) et conservée dans
 *   le trousseau sécurisé du téléphone (expo-secure-store / Keychain / Keystore).
 * - Les entrées sont chiffrées en AES (crypto-js) avant écriture dans AsyncStorage.
 *
 * Note : migration prévue vers SQLite chiffré ultérieurement (cf. architecture).
 */
import CryptoJS from 'crypto-js';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const KEY_NAME = 'slp.journal.key';

let cachedKey: string | null = null;

/** Récupère (ou crée au premier appel) la clé de chiffrement du journal. */
async function getKey(): Promise<string> {
  if (cachedKey) return cachedKey;

  const existing = await SecureStore.getItemAsync(KEY_NAME);
  if (existing) {
    cachedKey = existing;
    return existing;
  }

  const bytes = await Crypto.getRandomBytesAsync(32);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  await SecureStore.setItemAsync(KEY_NAME, hex);
  cachedKey = hex;
  return hex;
}

/** Sérialise puis chiffre une valeur quelconque. */
export async function encryptJSON(value: unknown): Promise<string> {
  const key = await getKey();
  return CryptoJS.AES.encrypt(JSON.stringify(value), key).toString();
}

/** Déchiffre puis désérialise. Renvoie `null` si le contenu est illisible. */
export async function decryptJSON<T>(cipher: string): Promise<T | null> {
  try {
    const key = await getKey();
    const plain = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
    if (!plain) return null;
    return JSON.parse(plain) as T;
  } catch {
    return null;
  }
}
