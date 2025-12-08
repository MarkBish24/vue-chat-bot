import jwt from "jsonwebtoken";
const { verify } = jwt;
import { User } from "../entities/user.entity.js";
import type { Request, Response } from "express";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";
    const payload: any = verify(accessToken, process.env.SECRET);
    const user = await User.findOne({ where: { id: payload.id } });
    next();
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};
