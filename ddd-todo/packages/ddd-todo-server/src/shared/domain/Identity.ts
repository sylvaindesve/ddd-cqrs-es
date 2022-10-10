import { ValueObject } from "./ValueObject";

/**
 * Un objet-valeur représentenat un identifiant.
 */
export interface Identity extends ValueObject {
  toString(): string;
}
