import { EventSourcingRepository } from "../../../shared/domain";
import { User, UserId } from "../domain";

export interface RegisterUserCommand {
  id: string;
  email: string;
  name: string;
}

export class UserService {
  constructor(
    private readonly userRepository: EventSourcingRepository<User, UserId>
  ) {}

  public async registerUser(command: RegisterUserCommand): Promise<void> {
    const userId = new UserId(command.id);
    const user = User.registerUser(userId, command.email, command.name);
    await this.userRepository.save(user);
  }
}
