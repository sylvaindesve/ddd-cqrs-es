import { DomainEvent } from "../../../../shared/domain";

export class UserCreated implements DomainEvent {
  constructor(public readonly email: string, public readonly name: string) {}
}
