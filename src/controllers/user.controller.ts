import { User } from "../entities/user.entity.js";
import { Not } from "typeorm";

export const Users = async (req, res) => {
  const user = req["user"];

  const users = await user.find({
    where: {
      id: Not(user.id),
    },
  });

  res.send(users);
};
