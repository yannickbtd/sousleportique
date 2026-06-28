const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** Formate un timestamp en français : « 28 juin 2026, 16:30 ». */
export function formatDate(ts: number): string {
  const d = new Date(ts);
  const heure = `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}, ${heure}`;
}
