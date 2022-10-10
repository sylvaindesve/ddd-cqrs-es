import { ClassUtil } from "../../core/utils/ClassUtils";
import { Identity } from "../Identity";

import { DomainEvent } from "./DomainEvent";

/**
 * Encapsule un événement métier dans un message qui porte l'identifiant de
 * l'agrégat, la date d'occurrence et l'ordre.
 */
export class DomainMessage<
  Event extends DomainEvent = DomainEvent,
  Id extends Identity = Identity
> {
  public static recordNow<
    Event extends DomainEvent = DomainEvent,
    Id extends Identity = Identity
  >(
    aggregateId: Id,
    playhead: number,
    payload: Event
  ): DomainMessage<Event, Id> {
    return new DomainMessage(aggregateId, playhead, payload, new Date());
  }

  constructor(
    public readonly aggregateId: Id,
    public readonly playhead: number,
    public readonly payload: Event,
    public readonly recordedOn: Date
  ) {}

  public toString(): string {
    const eventName = ClassUtil.nameOfInstance(this.payload);
    return `${this.aggregateId.toString()}:${this.playhead}:${eventName}`;
  }
}
