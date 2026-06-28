// Permet à TypeScript de comprendre les imports CSS (web / NativeWind-like)
// que Metro gère au runtime mais que `tsc` ne type pas par défaut.
declare module '*.css';
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
