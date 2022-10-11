import { UserId } from "./modules/users/domain";
import { ServiceRegistry } from "./ServiceRegistry";
import { InMemoryEventStore } from "./shared/infra/database/InMemoryEventStore";
import { createApp } from "./shared/infra/http/createApp";

const serviceRegistry = new ServiceRegistry(new InMemoryEventStore<UserId>());

createApp(serviceRegistry).start(3000);
