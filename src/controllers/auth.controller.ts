import { User } from "../entities/user.entity.js";
import bcrypt from "bcryptjs";
import { access } from "fs";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

export const Register = async (req, res) => {
  const { password, password_confirm, ...body } = req.body;

  if (password !== password_confirm) {
    return res.status(400).send({
      message: "Passwords do not match",
    });
  }

  const user = await User.save({
    ...body,
    password: await bcrypt.hash(password, 10),
  });

  res.send(user);
};

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    select: ["id", "password"],
  });

  if (!user) {
    return res.status(400).send({
      message: "Invalid Credentials",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "Invalid Credentials",
    });
  }

  const jwt = sign({ id: user.id }, process.env.SECRET);

  res.send({ jwt });
};

export const GetUser = async (req, res) => {
  res.send(req["user"]);
};

export const UpdateUser = async (req, res) => {
  const user: User = req["user"];

  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;

  if (req.body.password) {
    if (req.body.password !== req.body.password_confirm) {
      return res.status(400).send({
        message: "Password's do not match",
      });
    }
  }
  await user.save();

  res.send(user);
};
