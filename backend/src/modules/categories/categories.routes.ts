import { FastifyInstance } from "fastify";

import { CategoriesController } from "./categories.controller";

const categoriesController = new CategoriesController();

export async function categoriesRoutes(app: FastifyInstance) {
  app.get("/categories", categoriesController.list);
  app.get("/categories/:id", categoriesController.findById);
  app.post("/categories", categoriesController.create);
  app.put("/categories/:id", categoriesController.update);
  app.delete("/categories/:id", categoriesController.delete);
}
