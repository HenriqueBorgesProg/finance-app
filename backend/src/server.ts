import "reflect-metadata";
import Fastify from "fastify";
import dotenv from "dotenv";

import { AppDataSource } from "./database/data-source";

dotenv.config();

const app = Fastify({
  logger: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
  };
});

const start = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Database connected successfully");

    const port = Number(process.env.PORT) || 3333;

    await app.listen({
      port,
      host: "0.0.0.0",
    });

    console.log(`Server running on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
