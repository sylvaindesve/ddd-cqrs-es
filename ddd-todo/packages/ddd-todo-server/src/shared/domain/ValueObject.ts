/**
 * Pas grand chose ici, c'est surtout une interface de marquage pour faire
 * apparaître de manière explicite les objets-valeurs dans le code.
 */
export interface ValueObject {
  equals(other: ValueObject): boolean;
}
