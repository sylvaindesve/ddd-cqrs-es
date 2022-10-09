import cors from "cors";
import express from "express";

const app = express();

const v1Router = express.Router();
v1Router.get("/", (request, response) => {
  return response.json({ message: "ddd-todo v1 API up and running" });
});

app.use(cors({ origin: "*" }));

app.use("/api/v1", v1Router);
app.listen(3000, () => console.log("Server listening on port 3000"));
