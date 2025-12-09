import type { Router } from "express";
import { SendMessage } from "./controllers/message.controller.js";
import {
  Login,
  Register,
  GetUser,
  UpdateUser,
} from "./controllers/auth.controller.js";
import { Users } from "./controllers/user.controller.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";

export const routes = (router: Router) => {
  router.post(`/api/register`, Register);
  router.post(`/api/login`, Login);
  router.get(`/api/user`, AuthMiddleware, GetUser);
  router.put(`/api/user`, AuthMiddleware, UpdateUser);
  router.get(`/api/user`, AuthMiddleware, Users);
  router.post(`/api/messages`, AuthMiddleware, SendMessage);
};
