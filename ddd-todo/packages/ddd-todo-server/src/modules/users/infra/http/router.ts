import express from "express";

import {
  RegisterUserCommand,
  UserService,
} from "../../application/UserService";

export const createUserRouter = (userService: UserService) => {
  const userRouter = express.Router();

  userRouter.post("/", (req, res) => {
    const command = req.body as RegisterUserCommand;
    userService
      .registerUser(command)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  });

  return userRouter;
};
