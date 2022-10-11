import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { ServiceRegistry } from "../../../ServiceRegistry";

import { createV1Router } from "./api/v1";

export function createApp(registry: ServiceRegistry) {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));

  app.use("/api/v1", createV1Router(registry));

  return {
    app,
    start: (port: number) => {
      app.listen(port, () => console.log(`Server listening on port ${port}`));
    },
  };
}
