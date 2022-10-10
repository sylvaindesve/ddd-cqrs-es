import { DomainMessage, EventStore, Identity } from "../../domain";

/** Implémentation (adapter) en mémoire de l'EventStore */
export class InMemoryEventStore<Id extends Identity = Identity>
  implements EventStore<Id>
{
  private messagesByAggregateId: Map<string, DomainMessage[]> = new Map();

  has(id: Id): Promise<boolean> {
    return Promise.resolve(this.messagesByAggregateId.has(id.toString()));
  }

  async load(id: Id): Promise<DomainMessage[]> {
    if (await this.has(id)) {
      return Promise.resolve(this.messagesByAggregateId.get(id.toString()));
    } else {
      return Promise.reject(`No events with id ${id.toString()}`);
    }
  }

  async append(id: Id, messages: DomainMessage[]): Promise<void> {
    if (await this.has(id)) {
      this.messagesByAggregateId.get(id.toString()).push(...messages);
    } else {
      this.messagesByAggregateId.set(id.toString(), messages);
    }
  }
}
