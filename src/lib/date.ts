const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** Clé de jour locale au format AAAA-MM-JJ (pour le suivi de série). */
export function dayKey(d: Date = new Date()): string {
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  const dd = d.getDate().toString().padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Formate un timestamp en français : « 28 juin 2026, 16:30 ». */
export function formatDate(ts: number): string {
  const d = new Date(ts);
  const heure = `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}, ${heure}`;
}
