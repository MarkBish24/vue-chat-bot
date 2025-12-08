import express from "express";
import cors from "cors";
import { routes } from "./routes.js";
import "./socket.js";
import "dotenv/config";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/*.ts"],
  logging: false,
  synchronize: true,
});

dataSource.initialize().then((connection) => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:4200",
        "http://localhost:5173",
      ],
    })
  );

  routes(app);

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(8000, () => {
    console.log("Listening to port 8000");
  });
});
