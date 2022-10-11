import { Identity, ValueObject } from "../../../shared/domain";

export class UserId implements Identity {
  constructor(private readonly id: string) {}

  public equals(other: ValueObject): boolean {
    return other instanceof UserId && other.id === this.id;
  }

  public toString(): string {
    return `UserId[${this.id}]`;
  }
}
