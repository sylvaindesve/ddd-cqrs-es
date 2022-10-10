import { EventStore } from "./events/EventStore";
import {
  EventSourcedAggregateRoot,
  EventSourcedAggregateRootConstructor,
} from "./EventSourcedAggregateRoot";
import { Identity } from "./Identity";

/**
 * Implémentation d'un repository pour des agrégats "event sourcés".
 * Ce repository s'appuie lui même sur un EventStore dont l'implémentation
 * est à la discrétion de la couche infra.
 */
export class EventSourcingRepository<
  T extends EventSourcedAggregateRoot<Id>,
  Id extends Identity = Identity
> {
  constructor(
    private eventStore: EventStore,
    private aggregateClass: EventSourcedAggregateRootConstructor<T>
  ) {}

  public has(id: Id): Promise<boolean> {
    return this.eventStore.has(id);
  }

  public async load(id: Id): Promise<T> {
    const messages = await this.eventStore.load(id);
    const aggregate = new this.aggregateClass(id);
    aggregate.initialize(messages);
    return aggregate;
  }

  public async save(aggregate: T): Promise<void> {
    const messages = aggregate.getUncommittedEvents();
    await this.eventStore.append(aggregate.getId(), messages);
  }
}
