import express from "express";

import { createUserRouter } from "../../../../modules/users/infra/http/router";
import { ServiceRegistry } from "../../../../ServiceRegistry";

export function createV1Router(registry: ServiceRegistry) {
  const router = express.Router();

  router.get("/", (request, response) => {
    return response.json({ message: "ddd-todo v1 API up and running" });
  });

  router.use("/users", createUserRouter(registry.getUserService()));

  return router;
}
