import { Identity } from "./Identity";

/**
 * Pour marqué une entité métier.
 */
export abstract class Entity<Id extends Identity = Identity> {
  private id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  public getId(): Id {
    return this.id;
  }
}
