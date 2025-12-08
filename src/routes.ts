import type { Router } from "express";
import { Message } from "./controllers/message.controller.js";
import { Login, Register, GetUser } from "./controllers/auth.controller.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";

export const routes = (router: Router) => {
  router.post(`/api/message`, Message);
  router.post(`/api/register`, Register);
  router.post(`/api/login`, Login);
  router.get(`/api/user`, AuthMiddleware, GetUser);
};
