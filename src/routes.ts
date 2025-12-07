import type { Router } from "express";
import { Message } from "./controllers/message.controller.js";

export const routes = (router: Router) => {
  router.post(`/api/message`, Message);
};
