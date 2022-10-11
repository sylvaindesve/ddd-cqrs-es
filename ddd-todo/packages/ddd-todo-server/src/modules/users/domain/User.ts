import { EventSourcedAggregateRoot } from "../../../shared/domain";

import { UserCreated } from "./events/UserCreated";
import { UserId } from "./UserId";

export class User extends EventSourcedAggregateRoot<UserId> {
  public static registerUser(id: UserId, email: string, name: string): User {
    const instance = new User(id);
    instance.apply(new UserCreated(email, name));
    return instance;
  }
}
