import { UserService } from "./modules/users/application/UserService";
import { User, UserId } from "./modules/users/domain";
import { EventSourcingRepository, EventStore } from "./shared/domain";

export class ServiceRegistry {
  private userRepository: EventSourcingRepository<User, UserId>;
  private userService: UserService;

  constructor(private readonly userEventStore: EventStore<UserId>) {
    this.userRepository = new EventSourcingRepository(
      this.userEventStore,
      User
    );
    this.userService = new UserService(this.userRepository);
  }

  public getUserService(): UserService {
    return this.userService;
  }
}
