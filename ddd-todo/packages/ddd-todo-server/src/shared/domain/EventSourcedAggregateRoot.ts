import { ClassUtil } from "../core/utils/ClassUtils";

import { Entity } from "./Entity";
import { DomainEvent } from "./events/DomainEvent";
import { DomainMessage } from "./events/DomainMessage";
import { Identity } from "./Identity";

/**
 * Implémentation abstraite d'une entité métier racine d'un agrégat avec
 * sourcing par les événements.
 */
export abstract class EventSourcedAggregateRoot<
  Id extends Identity = Identity
> extends Entity<Id> {
  /** Evénement métier non sauvegardés */
  private uncommittedEvents: DomainMessage[] = [];

  /** Pour numéroter les événements métier */
  private playhead = -1;

  /** Initialise l'agrégat à partir d'événement métier */
  public initialize(messages: DomainMessage[]): void {
    for (const message of messages) {
      this.playhead += 1;
      this.mutateWhen(message.payload);
    }
  }

  /** Renvoie les événéments non sauvegardés dans le but de les sauvegarder */
  public getUncommittedEvents(): DomainMessage[] {
    const messages = JSON.parse(
      JSON.stringify(this.uncommittedEvents)
    ) as DomainMessage[];
    this.uncommittedEvents = [];
    return messages;
  }

  /** Applique l'événement métier sur cet agrégat */
  protected apply(event: DomainEvent): void {
    this.playhead += 1;
    this.uncommittedEvents.push(
      DomainMessage.recordNow(this.getId(), this.playhead, event)
    );
    this.mutateWhen(event);
  }

  /**
   * Applique la méthode `whenSomeEventType(event: SomeEventType)` si elle
   * existe.
   */
  private mutateWhen(event: DomainEvent): void {
    const handler = `when${ClassUtil.nameOfInstance(event)}`;
    if (this[handler] && typeof this[handler] === "function") {
      (this[handler] as (event: DomainEvent) => void)(event);
    }
  }
}

export type EventSourcedAggregateRootConstructor<
  T extends EventSourcedAggregateRoot<Id>,
  Id extends Identity = Identity
> = new (id: Id) => T;
