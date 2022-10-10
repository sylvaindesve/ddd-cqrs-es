import { Identity } from "../Identity";

import { DomainMessage } from "./DomainMessage";

/**
 * Interface (port) pour un mécanisme de stockage des événements métier.
 */
export interface EventStore<Id extends Identity = Identity> {
  has(id: Id): Promise<boolean>;
  load(id: Id): Promise<DomainMessage[]>;
  append(id: Id, messages: DomainMessage[]): Promise<void>;
}
