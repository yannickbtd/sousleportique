/**
 * Design system — « Sous le portique »
 * Esthétique « marbre & portique » : pierre chaude, encre profonde, accent bronze/or.
 * Palette claire (marbre) et sombre (charbon), cohérente avec un ton stoïcien sobre.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#211C15', // encre
    background: '#FBF8F2', // marbre chaud
    backgroundElement: '#F1EBE0', // pierre
    backgroundSelected: '#E6DECE',
    textSecondary: '#6F6555',
    accent: '#8C5A2B', // bronze
    accentSoft: '#EADBC6',
    border: '#E3DAC9',
  },
  dark: {
    text: '#F3EEE3',
    background: '#141210', // charbon
    backgroundElement: '#211E19',
    backgroundSelected: '#2C2820',
    textSecondary: '#A79C8A',
    accent: '#C9A24B', // or
    accentSoft: '#2E2A20',
    border: '#2E2A22',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
